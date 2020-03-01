# text.py
from database import addText, getAllText, findName, findUsername, deleteText, updateText
from app import app
from flask import request, session
import json


@app.route('/kababoo/stext', methods=['POST'])
def sendText():
    data = request.get_json()
    ip = data['id']
    text = data['text']
    result = addText(ip, text)
    if result:
        return{'errcode': 0, 'errmsg': '发表成功'}
    else:
        return{'errcode': 401, 'errmsg': '发表失败'}


@app.route('/kababoo/gtext', methods=['POST'])
def getText():
    data = request.get_json()
    on = data['open']
    if on == 1:
        allResult = getAllText()
        a = 0
        i = 0
        article_info = {}
        re = json.loads(json.dumps(article_info))
        while a < len(allResult):
            perResult = allResult[a]
            floor_id = perResult[0]
            user_id = perResult[1]
            time1 = perResult[2]
            time = time1.strftime('%Y-%m-%d %H:%M:%S')
            text = perResult[3]
            nameResult = findName(user_id)
            usernameResult = findUsername(user_id)
            if nameResult == None:
                finalNameResult = usernameResult[0]
            else:
                finalNameResult = nameResult[0]
            re[i] = {'finalName': finalNameResult, 'time': time,
                     'text': text, 'user_id': user_id, 'floor_id': floor_id}
            a += 1
            i += 1

        return re
    else:
        pass


@app.route('/kababoo/dtext', methods=['POST'])
def dText():
    data = request.get_json()
    on = data['delete']
    fid = data['floor_id']
    uid = data['user_id']
    if on == 1:
        rowcount = deleteText(fid,uid)
        if rowcount > 0:
            return{'errcode': 0, 'errmsg': '删除成功'}
        else:
            return{'errcode': 1, 'errmsg': '删除失败'}
    else:
        pass


@app.route('/kababoo/utext', methods=['POST'])
def utext():
    data = request.get_json()
    text = data['text']
    fid = data['floor_id']
    uid = data['user_id']
    result = updateText(text,fid,uid)
    if result:
        return{'errcode': 0, 'errmsg': '修改成功'}
    else:
        return{'errcode': 1, 'errmsg': '修改失败'}

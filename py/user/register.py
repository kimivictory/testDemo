#register.py
from database import findUser,createUser
from app import app
from flask import request,session

@app.route('/kababoo/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    password = data['password']
    result = findUser(username)
    if result:
        return{'errcode':400,'errmsg':'该用户已被注册'}
    else:
        rowcount = createUser(username,password)
        if rowcount>0:
            return{'errcode':0,'errmsg':'注册成功'}
        else:
            return{'errcode':1,'errmsg':'注册失败'}
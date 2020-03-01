#login.py
from database import checkUser
from app import app
from flask import request,session


@app.route('/kababoo/login',methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    result = checkUser(username,password)
    ip = result[0]
    if result:
        #session['user_id']=result[0]
        return{'errcode':0 , 'errmsg':'登录成功','id':ip}
    else:
        return{'errcode':401,'errmsg':'用户不存在或密码错误'}



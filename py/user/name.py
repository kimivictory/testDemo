#name.py
from database import findName
from app import app
from flask import request,session

@app.route('/kababoo/gname',methods=['POST'])
def getName():
    data = request.get_json()
    ip = data['id']
    result = findName(ip)
    if result:
        return{'name': result}
    else:
        return{'name':None}

# person.py
from database import addPerson,selectPerson
from app import app
from flask import request, session


@app.route('/kababoo/sperson', methods=['POST'])
def sendPerson():
    data = request.get_json()
    ip = data['id']
    name = data['name']
    age = data['age']
    gender = data['gender']
    result = addPerson(ip,name,age,gender)
    if result:
        return{'errcode':0,'errmsg':'修改成功'}
    else:
        return{'errcode':401,'errmsg':'修改失败'}

@app.route('/kababoo/gperson',methods=['POST'])
def getPerson():
    data = request.get_json()
    ip = data['id']
    result = selectPerson(ip)
    if result:
        name = result[0]
        age = result[1]
        gender = result[2]
        return{'name':name,'age':age,'gender':gender}
    else:
        name = None
        age = None
        gender = None
        return{'name':name,'age':age,'gender':gender}
    





# database.py
from config import User
import mysql.connector

conn = mysql.connector.connect(
    host=User['host'], user=User['user'], password=User['password'], database=User['database'])
db = conn.cursor()

#用户注册
def findUser(usernam):
    db.execute('select username from users where username=%s', (usernam,))
    result = db.fetchall()
    return result


def createUser(username, password):
    db.execute('insert into users (username,password) values(%s,%s)',
               (username, password))
    conn.commit()
    return db.rowcount


def checkUser(username, password):
    db.execute(
        'select id from users where username=%s and password=%s', (username, password))
    result = db.fetchone()
    if result:
        return result
    else:
        return None




#增添个人信息
def addPerson(ip, name, age, gender):
    db.execute('replace into person (id,name,age,gender) values(%s,%s,%s,%s)',(ip, name, age, gender))
    conn.commit()
    return db.rowcount

#获取个人信息
def selectPerson(ip):
    db.execute('select name,age,gender from person where id=%s',(ip,))
    result = db.fetchone()
    if result:
        return result
    else:
        return None

#增加留言
def addText(ip, text):
    db.execute('insert into text (id,text) values(%s,%s)',
               (ip, text))
    conn.commit()
    return db.rowcount

#获取留言
def getAllText():
    db.execute('select*from text')
    result = db.fetchall()
    return result


def findName(ip):
    db.execute('select name from person where id=%s', (ip,))
    result = db.fetchone()
    if result:
        return result
    else:
        return None


def findUsername(ip):
    db.execute('select username from users where id=%s', (ip,))
    result = db.fetchone()
    return result

def deleteText(fid,uid):
    db.execute('DELETE FROM text WHERE floor_id=%s and id=%s',(fid,uid))
    conn.commit()
    return db.rowcount

def updateText(text,fid,uid):
    db.execute('UPDATE text SET text=%s WHERE (floor_id = %s and id=%s)',(text,fid,uid))
    conn.commit()
    return db.rowcount

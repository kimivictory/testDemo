#app.py
from flask import Flask
from flask_cors import CORS
from config import Secret


app=Flask(__name__)
CORS(app,supports_credentials=True)
app.secret_key=Secret['secret_key']

from user.login import *
from user.register import * 
from user.text import*
from user.person import*
from user.name import*



if __name__ == "__main__":
    app.run(host='localhost',port=9990)


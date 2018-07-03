"""
    This is the application file this file consists of all the configurations
    It also contains object created for DB queries
    __author__ = "TEAM BETA"
"""

from constants import *
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# Flask application
app = Flask(__name__)


# connect to the databse
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://{}:{}@{}/{}'.format(MYSQL_USER, MYSQL_PASS, MYSQL_SERVER, MYSQL_DBNAME)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


# create an sqlalchemy orm of the app
db = SQLAlchemy(app)

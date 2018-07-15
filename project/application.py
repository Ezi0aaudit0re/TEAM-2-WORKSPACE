"""
    This is the application file this file consists of all the configurations
    It also contains object created for DB queries
    __author__ = "TEAM BETA"
"""

from constants import *
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_marshmallow import Marshmallow
from flask_socketio import SocketIO, send

# Flask application
app = Flask(__name__)
ma = Marshmallow(app)
socketio = SocketIO(app)


# connect to the databse
#app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://{}:{}@{}/{}'.format(MYSQL_USER, MYSQL_PASS, MYSQL_SERVER, MYSQL_DBNAME)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://{}:{}@{}/{}'.format(MYSQL_USER, MYSQL_PASS, MYSQL_SERVER, MYSQL_DBNAME)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


#login manager
login_manager = LoginManager()
login_manager.init_app(app)
app.secret_key = SECRET_KEY

# create an sqlalchemy orm of the app
db = SQLAlchemy(app)

"""
This file is for dropping and creating tables from the models file.
navigate to the database folder and run the file
Notes:run this file using python, if errors you can't fix, use the python shell to run each command. 
"""
from ..constants import *
from sqlalchemy import create_engine
from models import Base

db_url = 'mysql+pymysql://{}:{}@{}/{}'.format(MYSQL_USER, MYSQL_PASS, MYSQL_SERVER, MYSQL_DBNAME)
engine = create_engine(db_url)

#Drop existing tables
Base.metadata.drop_all(engine)

#Create tables
Base.metadata.create_all(engine)

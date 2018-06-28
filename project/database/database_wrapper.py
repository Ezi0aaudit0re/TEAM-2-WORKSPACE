"""
    This file creates a wrapper for database queries

"""
__author__ = "TEAM BETA"

from application import db
from database.models import *
import helper
import database.database_helper as database_helper
from flask import jsonify



"""
    This class deals with all the database methods related to user
"""
class UserDB:

    def __init__(self):
        self.table = User


    """
        This method crreates a user in the database
        :param: kwargs -> key value arguments of the colums in the table
        :return: True/False
    """
    def create_user(self, kwargs):
        try:
            if database_helper.get_id(User, {User.email_id: kwargs["email_id"]}) or database_helper.get_id(User, {User.user_name: kwargs["user_name"]}):
                return jsonify({"return_code": 403, "message": "User already exists"})

            # hash the password to create a layer of security
            # using shah512 to hash
            hashed_password = helper.hash_password(kwargs["password"])

            user = User(first_name=kwargs["first_name"], last_name=kwargs["last_name"], user_name=kwargs["user_name"], \
                    password=hashed_password, email_id=kwargs["email_id"])

            db.session.add(user) # add in the queue
            db.session.commit() # commit to the database
            return jsonify({"return_code": 200, "message": "User successfully created"})
            

        except Exception as e:
            print("error occured when creating a user")
            print(str(e))
            return False

    """
       This method is used to get the instace of the user 
       :param: data -> THe json data used to match username and password
       :return: id -> The id of the user
    """
    def get_user(self, data):
        try:
            hashed_password = helper.hash_password(data['password'])
            # check if the first field matches username
            id = database_helper.get_id(self.table, {self.table.user_name: data['email_username'], self.table.password: hashed_password})


            if id == None:

                id = database_helper.get_id(self.table,\
                                            {self.table.email_id: data['email_username'], self.table.password: hashed_password})


            return id



        except Exception as e:
            print("Prorblem with get user database_wrapper file")
            print(str(e))
            return False







"""
    This class deals with all the database methods related to project
"""
class ProjectDB:

    def __init__(self):
        pass


    """
        This method crreates a project in the database
        :param: kwargs -> key value arguments of the colums in the table
        :return: True/False
    """
    def create_project(self, kwargs):
        try:
            print(kwargs)
            project = Project(name=kwargs["name"], description=kwargs["description"], admin_id=kwargs["admin_id"])

            db.session.add(project) # add in the queue
            db.session.commit() # commit to the database

            return True

        except Exception as e:
            print("error occured when creating a project")
            print(str(e))
            return False

"""
    This file creates a wrapper for database queries

"""
__author__ = "TEAM BETA"

from application import db
from database.models import *



"""
    This class deals with all the database methods related to user
"""
class UserDB:

    def __init__(self):
        pass


    """
        This method crreates a user in the database
        :param: kwargs -> key value arguments of the colums in the table
        :return: True/False
    """
    def create_user(self, kwargs):
        try:
            print(kwargs)
            user = User(first_name=kwargs["first_name"], last_name=kwargs["last_name"], user_name=kwargs["user_name"], \
                    password=kwargs["password"], email_id=kwargs["email_id"])

            db.session.add(user) # add in the queue
            db.session.commit() # commit to the database

            return True

        except Exception as e:
            print("error occured when creating a user")
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
            project = project(name=kwargs["name"], description=kwargs["description"], admin_id=kwargs["admin_id"]

            db.session.add(project) # add in the queue
            db.session.commit() # commit to the database

            return True

        except Exception as e:
            print("error occured when creating a project")
            print(str(e))
            return False

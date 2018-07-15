"""
    This file creates a wrapper for database queries

"""
__author__ = "TEAM BETA"


from application import db
from database.models import *
from database.schemas import *
import helper
import database.database_helper as database_helper
from flask import jsonify, session



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

            # check if user already exists
            if database_helper.get_data(self.table, {self.table.email_id: kwargs["email_id"]}) or database_helper.get_data(self.table, {self.table.user_name: kwargs["user_name"]}):
                return {"code": 403, "message": "User already exists"}

            # hash the password to create a layer of security
            # using shah512 to hash
            hashed_password = helper.hash_password(kwargs["password"])

            user = User(first_name=kwargs["first_name"], last_name=kwargs["last_name"], user_name=kwargs["user_name"], \
                    password=hashed_password, email_id=kwargs["email_id"])

            db.session.add(user) # add in the queue
            db.session.commit() # commit to the database
            return {"code": 200, "message": "User successfully created. Please login to view your dashboard"}


        except Exception as e:
            print("error occured when creating a user")
            print(str(e))
            return False

    """
       This method is used to get the instace of the user
       :param: data -> THe json data used to match username and password
       :return: id -> The id of the user
    """
    def authenticate_user(self, data):
        try:
            hashed_password = helper.hash_password(data['password'])
            # check if the first field matches username
            user = database_helper.get_data(self.table, {self.table.user_name: data['emailUsername'], self.table.password: hashed_password})



            if user == None:


                user = database_helper.get_data(self.table,\
                                            {self.table.email_id: data['emailUsername'], self.table.password: hashed_password})


            return user



        except Exception as e:
            print("Prorblem with get user database_wrapper file")
            print(str(e))
            return False


    def get_user_data(self, user_id):
        data = database_helper.get_data(self.table, {self.table.id: user_id})
        if data is None:
            return jsonify({"code": 500, "message": "Internal Server error"})
        else:
            session['user'] = data.json()
            return jsonify({"code": 200, "message": "Success", "data": data.json()})










"""
    This class deals with all the database methods related to project
"""
class ProjectDB:

    def __init__(self):
        self.table = Project


    """
        This method crreates a project in the database
        :param: kwargs -> key value arguments of the colums in the table
        :return: True/False
    """
    def create_project(self, kwargs):
        try:
            # check if the prorject by the same id created
            instance = database_helper.get_data(self.table, {self.table.name: kwargs["name"], self.table.admin_id: kwargs["admin_id"]})

            if instance:
                return jsonify({"code": 403, "message": "Project name already exists by user"})




            project = self.table(name=kwargs["name"], description=kwargs["description"], admin_id=kwargs["admin_id"])

            db.session.add(project) # add in the queue
            db.session.commit() # commit to the database

            return jsonify({"code": 200, "message": "Successfully created user"})

        except Exception as e:
            print("error occured when creating a project")
            print(str(e))
            return jsonify({"code": 500, "message": "Error creating project"})



    """
        This method gets all the projects associated with a user
        :param: user_id -> THe id of the user
        :return: all the information about the projects
    """
    def get_projects(self, user_id):

        data = database_helper.get_data(self.table, {self.table.admin_id:user_id})

        if data is None:
            return jsonify({"code": 404, "message": "User is not the admin of any project"})
        else:
            return jsonify({"code": 200, "message": "success", "data": data})

######################## Message class ######################
"""
    THis class consists of all the methods required for creating message
"""

class MessageDB:

    def __init__(self):
        self.table = Message

    """
        This method gets various messages
        loops through them and inserts each one into the database
    """
    def create_messages(self, data):

        try:
            messages = list()
            for message in data:
                msg = self.table(msg = message['msg'],\
                                 user_id = message["user_id"],\
                                 project_id = message["project_id"])
                db.session.add(msg)

            db.session.commit()

            return jsonify({'code': 200, 'message': "Succeess"})

        except Exception as e:

            print("error occured when storing message in database")
            print(str(e))
            return jsonify({"code": 500, "message": "Error storing message in database"})





"""
    This class deals with all the database methods related to project
"""
class IssueDB:

    def __init__(self):
        self.table = Issue
    """
        This method crreates an issue in the database
        :param: kwargs -> key value arguments of the colums in the table
        :return: True/False
    """
    def create_issue(self, kwargs):
        try:

            issue = self.table(subject=kwargs["subject"], \
            description=kwargs["description"], \
            projects_id=kwargs["projects_id"], \
            created_by_user_id=kwargs["created_by_user_id"],\
            assigned_to_user_id=kwargs["assigned_to_user_id"])

            db.session.add(issue) # add in the queue
            db.session.commit() # commit to the database

            return jsonify({"code": 200, "message": "Successfully created issue"})

        except Exception as e:
            print("error occured when creating a issue")
            db.session.rollback()
            print(str(e))
            return jsonify({"code": 500, "message": "Error creating issue"})



    """
        This method gets all the issues associated with a user
        :param: user_id -> THe id of the user
        :return: all issues assigned to user: subject, priority, project_id, status, created_by_user_id, created_at, updated_at
    """
    def get_user_issues(self, user_id):
        try:
            #data = database_helper.get_data(self.table, {self.table.assigned_to_user_id:user_id}, False)
            data = db.session.query(self.table.subject, self.table.priority, self.table.projects_id, self.table.status, self.table.created_by_user_id, self.table.created_at, self.table.updated_at).filter(user_id).all()
            return jsonify({"code": 200, "message": "success", "data": data})
        except Exception as e:
            print("error getting user issues")
            db.session.rollback()
            print(str(e))
            return jsonify({"code": 500, "message": "Error getting user Issues"})
    
    """
        This method gets all issue details
        :param: issue_id -> The id of the issue
        :return: subject, description, priority, project_id, status, assigned_to_user_id, updated_at
    """
    def get_issue_details(self, issue_id):
        try:
            data = database_helper.get_data(self.table, {self.table.id:issue_id})
            return jsonify({"code":200, "message":"success", "data":data})
        except Exception as e:
            print("error getting user issues")
            db.session.rollback()
            print(str(e))
            return jsonify({"code":500, "message":"Error getting Issue details"})
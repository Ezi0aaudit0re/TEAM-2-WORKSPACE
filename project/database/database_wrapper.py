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



    """
        This method gets the basic user data
        Including the projects that the user has created
    """
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



            user = database_helper.get_data(User, {User.id: session['user_id']} )

            project = self.table(name=kwargs["name"], description=kwargs["description"], admin_id=kwargs["admin_id"])

            

            db.session.add(project) # add in the queue
            db.session.commit() # commit to the database


            # this will update the many to many table 
            # this happens through the backref 'user' in Project model 
            project.users.append(user)

            db.session.commit()

            return jsonify({"code": 200, "message": "Successfully created user"})

        except Exception as e:
            print("error occured when creating a project")
            print(str(e))
            return jsonify({"code": 500, "message": "Error creating project"})


    """
        This method is used to add members to the project
    """
    def add_members(self, kwargs):


        try:
            project = db.session.query(self.table).filter((self.table.id == kwargs["project_id"])).first()

            if project:
                user = db.session.query(User).filter((User.email_id == kwargs["email"])).first()
                if user:
                    project.users.append(user)
                    # commit to the databse
                    db.session.commit()
                    return jsonify({'code': 200, 'message': "User: {}, added as member".format(user.first_name + " " + user.last_name)})
                else:
                    return jsonify({'code': 403, 'message': 'User doesnot exist'})
            else:
                    return jsonify({'code': 403, 'message': 'Project doesnot exist'})




        except Exception as e:
            print(str(e))
            return jsonify({"code": 500, "message": "Internal Server Error"})



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




######################## Task class ######################
"""
    THis class consists of all the methods required for Tasks
"""

class TaskDB:

    def __init__(self):
        self.table = Task


    """
        This method deals with creating a task
        Makes sure that the user trying to create the task
        is a part of the project
    """
    def create_task(self, kwargs):
        try:
            # check if user is a part of the project
            project = database_helper.get_data(Project, {Project.id: kwargs['project_id']})

            if project:
                ids = [ user.id for user in project.users] 
                if kwargs['assigned_by_user_id'] not in ids:
                    return jsonify({'code': 403, 'message': 'User is not a part of the project'})

                # create the task
                task = self.table(name=kwargs['name'],\
                                  description=kwargs['description'],\
                                  priority=kwargs['priority'],\
                                  due_date=kwargs['due_date'],\
                                  assigned_to_user_id=kwargs['assigned_to_user_id'],\
                                  assigned_by_user_id=kwargs['assigned_by_user_id'],\
                                  projects_id=kwargs['project_id'],\
                                  status=kwargs['status']
                                 )

                db.session.add(task)
                db.session.commit()

                return jsonify({'code': 200, 'message': 'Task successfully created'})


            else:
                return jsonify({'code': 404, 'message': 'Project with the specified ID doesenot exist'})

        except Exception as e:
            print("Error occured when creating a task in databae_wrapper")
            print(str(e))
            return jsonify({'code': 500, 'message': 'Internal Server eror'})


    """
        This method is used to get information about the task based on the id    
    """
    def get_task(self, id):
        try:

            task = database_helper.get_data(self.table, {self.table.id: id})
            
            if task:
                return jsonify({'code': 200, 'message': 'Success', 'data': task.json()})
            else:
                return jsonify({'code': 404, 'message': 'Task with the particular ID does not exist'})
        except Exception as e:
            print("Error occured when retrieving a task in databae_wrapper")
            print(str(e))
            return jsonify({'code': 500, 'message': 'Internal Server eror'})


    """
        This method gets all the tasks assigned to a user [DEFAULT]
        gets tasks assigned in a project
        gets tasks assigned to other users
        :pararm: user_id -> The id of the user 
    """
    def get_assigned_task(self, id, colum_as_key=None):

        if colum_as_key is None:
            colum_as_key = self.table.assigned_to_user_id

        try:
            task = database_helper.get_data(self.table, {colum_as_key: id})

            return database_helper.check_exists_and_return_json(task, 'There are no tasks')

        except Exception as e:
            msg = "Error occured when retrieving users in databae_wrapper"
            return database_helper.exception(msg, e)
    


    def get_task_by_project(self, project_id):

        # call get_assigned_task method with self.table.project_id as param to colum as key
        return self.get_assigned_task(project_id, self.table.projects_id)



    """
        Get tasks that you have assigned
    """
    def get_task_assigned_by_user(self, user_id):

        # call get_assigned_task method with self.table.assigned_by_user_id as param to colum as key
        return self.get_assigned_task(user_id, self.table.assigned_by_user_id)

    









            





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
            #check project exists and user is assigned to that project
            projects = database_helper.get_data(Project, {Project.id:kwargs["projects_id"]})
            if projects == None: 
                return jsonify("code":404, "message":"Project does not exist")

            user_ids = [ user.id for user in project.users] 

            if kwargs["created_by_user_id"] not in user_ids:
                return jsonify("code":404, "message": "User not assigned to project")

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
        This method gets all the issues associated with a user, filtered by created_by_user_id, or assigned_to_user_id
        :param: user_id -> THe id of the user
        :param: user_type -> (assigned_to_user, created_by)
        :return: all issues assigned to user: subject, priority, project_id, status, created_by_user_id, created_at, updated_at
    """
    def get_user_issues(self, user_id, user_type_filter=None):
        try:
            if user_type_filter == None:
                data = database_helper.get_data(self.table, {self.table.assigned_to_user_id:user_id, self.table.created_by_user_id:user_id})
            else:              
                data = database_helper.get_data(self.table, {user_type_filter:user_id}, False)
                #data = db.session.query(self.table.subject, self.table.priority, self.table.projects_id, self.table.status, self.table.created_by_user_id, self.table.created_at, self.table.updated_at).filter(user_id).all()
            if data == None:
                return jsonify({"code": 404, "message": "No issue assigned to user"})
            else:
                return jsonify({"code":200, "message": "Successfully retrieved user issues", "data":data})
            
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
            if data == None:
                return jsonify({"code":404, "message":"No issue with given issue id"})
            else:
                return jsonify({"code":500, "message":"Successfully retrieved issue details"})
            return jsonify({"code":200, "message":"success", "data":data})
        except Exception as e:
            print("error getting user issues")
            db.session.rollback()
            print(str(e))
            return jsonify({"code":500, "message":"Error getting Issue details"})

    """
        This method gets all issues in a project. No care for issue status
        :param: project_id
        :return: issues
    """

    def get_project_issues(self, projects_id):

        try:

            #check if project exists
            project = database_helper.get_data(Project, {Project.id:projects_d})

            if project == None:
                return jsonify({"code":404, "message":"No project with given id"})
            
            data = database_helper.get_data(self.table, {self.table.projects_id:projects_id}, False)

            return jsonify({"code":200, "message":"Successfully retrived issues", "data":data})
        
        except Exception as e:
            print("error getting project issues")
            db.session.rollback()
            print(str(e))
            return jsonify({"code":500, "message": "Error getting project issues"})
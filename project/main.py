"""
    This is the main file which acts as a server 
    All the routes are specified here
"""

__author__ = "TEAM BETA"

import sys, os
import time
from datetime import datetime
from constants import DEFAULT_TASK_STATUS, DEFAULT_TASK_PRIORITY

sys.path.append(os.getcwd())


from application import *
from flask import render_template, request, jsonify, redirect, url_for,flash, session
import database.database_wrapper as database_wrapper 
from database.models import *
from database.schemas import *
 # login authentication extension
from flask_login import login_user, login_required, logout_user
from flask import json


@app.route('/') # home page
@login_required
def index():
    return render_template('index.html')




# get routed to this page if the user has not signed up
@app.route('/signup') # signup page 
@login_manager.unauthorized_handler
def signup():
    # this should also serve as a login page
    return render_template('signup.html')







@app.route('/createUser', methods=["GET", "POST"]) # create a user
def create_user():

    if request.method == 'POST':

        # deals with the post requeust
        json_data = request.form

        data = {"first_name": json_data["firstName"], "last_name": json_data["lastName"] ,\
                "user_name": json_data["username"], "password": json_data["password"],\
                "email_id": json_data["emailAddress"]}
        result = database_wrapper.UserDB().create_user(data)


        flash(result['message']) # flash success or failiure message 
        return redirect('/signup')


# login loader
# src - https://www.youtube.com/watch?v=2dEM-s3mRLE
@login_manager.user_loader
def load_user(user_id):
    return db.session.query(User).get(int(user_id))



# route for loging in the user
@app.route('/authenticate', methods=["POST"])
def login():

    if request.method == 'POST':

        json_data = request.form
        result = database_wrapper.UserDB().authenticate_user(json_data)



        if result:


            # this is the part of flask_login module
            login_user(result)


            session["user_id"] = result.id

            return redirect("/")

        else:
            flash("User does not exist")
            return redirect("/signup")


# logout the user
@app.route('/logout', methods=["POST", "GET"])
@login_required
def logout():
    logout_user()
    return render_template('signup.html')


#################################### AJAX Routes ##########################################

url_pre = "/api"
    

# route to create a new project
@app.route(url_pre + '/project/new', methods=["POST"])
@login_required
def create_project():

    if request.method == "POST":

        data = request.get_json()['project']

        json_data = {"name": data["name"], "description": data["description"], "admin_id": session["user_id"], "users": data["users"] }

        #json_data = {"name": "Test Project with multiple users", "description": "Test description", "users": ["test@test.com, xyz"], "admin_id": 19}


        result = database_wrapper.ProjectDB().create_project(json_data)

        return result


# get user info
@app.route(url_pre + '/getUserInfo', methods=["POST"])
@login_required
def get_user_info():
    try:

        user_id = request.get_json()['userId']
    
        return database_wrapper.UserDB().get_user_info(user_id)
    except Exception as e:
        print(str(e))
        return jsonify({'code': 500, 'message': 'Internal Server Error'})
    

# route to add members to the project
@app.route(url_pre + '/addMember', methods=["POST"])
@login_required
def add_member():
     #TODO

    #data = request.get_json()
    json_data = {'email': "test3@test.com", 'project_id': 33}
    result = database_wrapper.ProjectDB().add_members(json_data)

    return result


#route to get info about a single project
@app.route(url_pre + '/project', methods=["POST"])
@login_required
def get_project():

    project_id = request.get_json()['projectId']
    user_id = session['user_id']
    return database_wrapper.ProjectDB().get_project(project_id, user_id)


################### GET BASIC INFO OF THE USER ################

@app.route(url_pre + '/getBasicInfo', methods=["POST", "GET"])
@login_required
def basic_info():

    # we have our user id in session["user_id"]
    # now we get the projects that the user is a part of 
    result = database_wrapper.UserDB().get_user_data(session['user_id'])
    
    return result

###############################################################


################### Message api calls ################

@app.route(url_pre + '/storeMessage', methods=["POST"])
@login_required
def store_message():

    
    data = request.get_json()['messages']

    # json_data = [{'user_id': 19 , 'project_id': 1, 'msg': 'test message storing', 'created_at': time.strftime('%Y-%m-%d %H:%M:%S')},\
                
    #              {'user_id': 21, 'project_id': 1, 'msg': 'second message', 'created_at': time.strftime('%Y-%m-%d %H:%M:%S')}]

    result = database_wrapper.MessageDB().create_messages(data)


    return result



@app.route(url_pre + '/messages', methods=["POST"])
@login_required
def retrieve_messages():

    data = request.get_json()

    result = database_wrapper.MessageDB().retrieve_messages(data['projectId'])


    return result


####################### Issue Routes ########################  

@app.route(url_pre + '/issue/new', methods=["POST"])
@login_required
def create_issue():

    data = request.get_json()["issue"]
    project_id = request.get_json()["projectId"]

    print(data)

    json_data = {"subject":data["subject"], \
                "description":data["description"], \
                "projects_id":project_id, \
                "created_by_user_id":session["user_id"], \
                "assigned_to_user_id":data["assignedToUserId"]}

    result = database_wrapper.IssueDB().create_issue(json_data)

    return result

@app.route(url_pre + '/getUserIssues', methods=["POST"])
@login_required
def get_user_issues():
    user_id = session["user_id"]
    result = database_wrapper.IssueDB().get_user_issues(user_id)
    
    return result

@app.route(url_pre + '/getProjectIssues', methods=["POST"])
def get_project_issues():
    project_id = request.get_json()["projectId"]
    result = database_wrapper.IssueDB().get_project_issues(project_id)
    return result

@app.route(url_pre + '/getIssue', methods=["POST"])
@login_required
def get_issue_details():
    data = request.get_json()

    result = database_wrapper.IssueDB().get_issue_details(data['issueId'])

    return result
    
####################### Task Routes ########################

@app.route(url_pre + '/newTask', methods=["POST"])
@login_required
def add_task():

    current_time = time.strftime('%Y-%m-%d %H:%M:%S')

    task = request.get_json()['task']
    project_id = request.get_json()['projectId']

    due_date = datetime.strptime(task['dueDate'], '%Y-%m-%dT%H:%M:%S.%fZ')

    json_data = {'name': task['name'], 'description': task['description'] , 'priority': DEFAULT_TASK_PRIORITY, \
                 'due_date': due_date, 'assigned_to_user_id': task['user']['email'], 'assigned_by_user_id': session['user_id'], 'status': DEFAULT_TASK_STATUS, 'project_id': project_id }

    return database_wrapper.TaskDB().create_task(json_data)


@app.route(url_pre + '/Task/Project', methods=['POST'])
@login_required
def get_task():

    data = request.get_json()

    return database_wrapper.TaskDB().get_task(data['taskId'])


@app.route(url_pre + '/Task/AssignedToUser', methods=['POST'])
@login_required
def get_assigned_task():
    # this method gets all the task assigned to a user
    user_id = session['user_id']

    return database_wrapper.TaskDB().get_assigned_task(user_id)


@app.route(url_pre + '/getTasks', methods=['POST'])
@login_required
def get_assigned_task_by_project():
    # this method gets all the task assigned to a user

    data = request.get_json()
    print(database_wrapper.TaskDB().get_task_by_project(data['projectId']))

    return database_wrapper.TaskDB().get_task_by_project(data['projectId'])


@app.route(url_pre + '/Task/UserAssigned', methods=['POST'])
@login_required
def get_assigned_task_by_user():
    # this method gets all the task assigned to a user
    user_id = session['user_id']

    return database_wrapper.TaskDB().get_task_assigned_by_user(user_id)





########################## Sockets for message ########################
@socketio.on('message')
def handle_message(msg):
    print("Message recieved: " + msg)
    socketio.emit('message', msg)


if __name__ == '__main__':
    socketio.run(app, debug=True)

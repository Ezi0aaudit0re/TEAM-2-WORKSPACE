"""
    This is the main file which acts as a server 
    All the routes are specified here
"""

__author__ = "TEAM BETA"

import sys, os
import time
from constants import DEFAULT_TASK_STATUS, DEFAULT_TASK_PRIORITY

sys.path.append(os.getcwd())


from application import *
from flask import render_template, request, jsonify, redirect, url_for,flash, session
import database.database_wrapper as database_wrapper 
from database.models import *
from database.schemas import *
 # login authentication extension
from flask_login import login_user, login_required, logout_user


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


# route to add members to the project
@app.route(url_pre + '/addMember', methods=["POST"])
@login_required
def add_member():

    #data = request.get_json()
    json_data = {'email': "test3@test.com", 'project_id': 33}
    result = database_wrapper.ProjectDB().add_members(json_data)

    return result


#route to get info about a single project
@app.route(url_pre + '/projects/<int:project_id>', methods=["POST"])
#@login_required
def get_project(project_id):

    user_id = session['user_id']

    return database_wrapper.ProjectDB().get_project(project_id, user_id)


################### GET BASIC INFO OF THE USER ################
# or projects/1 or /2 via URLto bypass
@app.route(url_pre + '/getBasicInfo', methods=["POST", "GET"])
@login_required
def basic_info():

    #if session.get("user") is None:
        #return jsonify({"code": 500, "meessage": "Internal server error"})

    # we have our user id in session["user_id"]
    # now we get the projects that the user is a part of 
    result = database_wrapper.UserDB().get_user_data(session['user_id'])
    
    return result

###############################################################


################### Message api calls ################

@app.route(url_pre + '/storeMessage', methods=["POST"])
#@login_required
def store_message():

    

    data = request.get_json()
    print(data)
    json_data = [{'user_id': 19 , 'project_id': 1, 'msg': 'test message storing', 'created_at': time.strftime('%Y-%m-%d %H:%M:%S')},\
                
                 {'user_id': 21, 'project_id': 1, 'msg': 'second message', 'created_at': time.strftime('%Y-%m-%d %H:%M:%S')}]

    result = database_wrapper.MessageDB().create_messages(json_data)


    return result



@app.route(url_pre + '/projects/<int:project_id>/messages', methods=["POST"])
@login_required
def retrieve_messages(project_id):

    result = database_wrapper.MessageDB().retrieve_messages(project_id)

    return result







########################################################


    




####################### Task Routes ########################

@app.route(url_pre + '/projects/<int:project_id>/newTask', methods=["POST"])
@login_required
def add_task(project_id):

    current_time = time.strftime('%Y-%m-%d %H:%M:%S')

    data = request.get_json()
    print(data)
    json_data = {'name': data['name'], 'description': data['description'] , 'priority': DEFAULT_TASK_PRIORITY, \
                 'due_date': current_time, 'assigned_to_user_id': 19, 'assigned_by_user_id': session['user_id'], 'status': DEFAULT_TASK_STATUS, 'project_id': project_id }

    return database_wrapper.TaskDB().create_task(json_data)


@app.route(url_pre + '/projects/<int:project_id>/tasks/<int:task_id>', methods=['POST'])
@login_required
def get_task(task_id):

    return database_wrapper.TaskDB().get_task(task_id)


@app.route(url_pre + '/Task/AssignedToUser', methods=['POST'])
@login_required
def get_assigned_task():
    # this method gets all the task assigned to a user
    user_id = session['user_id']

    return database_wrapper.TaskDB().get_assigned_task(user_id)


@app.route(url_pre + '/Task/Project', methods=['POST'])
@login_required
def get_assigned_task_by_project():
    # this method gets all the task assigned to a user
    project_id = 17

    return database_wrapper.TaskDB().get_task_by_project(project_id)


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









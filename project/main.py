"""
    This is the main file which acts as a server 
    All the routes are specified here
"""

__author__ = "TEAM BETA"

import sys, os

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
            flash("User doesnot exist")
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

        json_data = {"name": data["name"], "description": data["description"], "admin_id": session["user_id"] }

        result = database_wrapper.ProjectDB().create_project(json_data)

        return result



# DRK 7/7/18 - Projects is coming back as blank array - use test data for dev
# or projects/1 or /2 via URLto bypass
@app.route(url_pre + '/getBasicInfo', methods=["POST", "GET"])
@login_required
def basic_info():

    #if session.get("user") is None:
        #return jsonify({"code": 500, "meessage": "Internal server error"})

    # we have our user id in session["user_id"]
    # now we get the projects that the user is a part of 
    result = database_wrapper.UserDB().get_user_data(session['user_id'])
    print(json.loads(result.data))
    return result

@app.route(url_pre + '/storeMessage', methods=["POST", "GET"])
#@login_required
def store_message():

    #data = request.get_json()
    json_data = [{'user_id': session['user_id'], 'project_id': 1, 'msg': 'test message storing', 'created_at': time.strftime('%Y-%m-%d %H:%M:%S')},\
                
                 {'user_id': session['user_id'], 'project_id': 1, 'msg': 'second message', 'created_at': time.strftime('%Y-%m-%d %H:%M:%S')}]

    result = database_wrapper.MessageDB().create_messages(json_data)


    return result
    
@app.route(url_pre + '/issue/new', methods=["POST", "GET"])
def create_issue():
    if request.method == "POST":
        data = request.get_json()["issue"]
        json_data = {"subject":data["subject"], \
                    "description":data["description"], \
                    "projects_id":data["projects_id"], \
                    "created_by_user_id":session["user_id"], \
                    "assigned_to_user_id":data["assigned_to_user_id"]}
        result = database_wrapper.IssueDB().create_issue(json_data)
    return result

@app.route(url_pre + '/getProjectIssues', methods=['POST', 'GET'])
def get_project_issues():
    if request.method == "GET":
        user_id = session["user_id"]
        result = database_wrapper.IssueDB().get_user_issues(user_id)
    return result



########################## Sockets for message ########################
@socketio.on('message')
def handle_message(msg):
    print("Message recieved: " + msg)
    socketio.emit('message', msg)


if __name__ == '__main__':
    socketio.run(app, debug=True)









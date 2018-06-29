"""
    This is the main file which acts as a server 
    All the routes are specified here
"""

__author__ = "TEAM BETA"

import sys 

sys.path.insert(0, '../project')


from application import *
from flask import render_template, request, jsonify
import database.database_wrapper as database_wrapper 
from database.models import *
 # login authentication extension
from flask_login import login_user, login_required, logout_user


@app.route('/') # home page
def index():
    return render_template('index.html')

@app.route('/signup') # signup page
def signup():
    # this should also serve as a login page
    return render_template('signup.html')

@app.route('/project') # signup page
def project():
    return render_template('projects.html')





#################################### AJAX Routes ##########################################

url_pre = "/api"

@app.route(url_pre + '/createUser', methods=["GET", "POST"]) # create a user
def create_user():

    if request.method == 'GET':

        # this is to test if the database query wrapper works
        fake_data = {"first_name": "Aman", "last_name": "Nagpal",\
                     "user_name": "test", "password": "pass",\
                     "email_id": "test"}

        result = database_wrapper.UserDB().create_user(fake_data)
        return result

    elif request.method == 'POST':
        # deals with the post requeust
        json_data = request.get_json()["user"]
        data = {"first_name": json_data["firstName"], "last_name": json_data["lastName"] ,\
                "user_name": json_data["username"], "password": json_data["password"],\
                "email_id": json_data["emailAddress"]}
        result = database_wrapper.UserDB().create_user(data)

    return result


# login loader
# src - https://www.youtube.com/watch?v=2dEM-s3mRLE
@login_manager.user_loader
def load_user(user_id):
    return db.session.query(User).get(int(user_id))



# route for loging in the user
@app.route(url_pre + '/authenticate', methods=["POST"])
def login():

    if request.method == 'POST':

        #json_data = request.get_json()
        json_data = {'email_username': 'test', 'password': 'pass'}
        result = database_wrapper.UserDB().get_user(json_data)

        

        # this is the part of flask_login module
        login_user(result)



        if result:
            return jsonify({"return_code": 200, "message": "Success"})
        else:
            return jsonify({"return_code": 500, "message": "User doesnot exist"})


# logout the user
@app.route(url_pre + '/logout', methods=["POST", "GET"])
@login_required
def logout():
    logout_user()
    return render_template('signup.html')

    

# rouute to create a new project
@app.route(url_pre + '/createProject', methods=["POST"])
@login_required
def create_project():

    if request.method == "POST":

        json_data = {"name": "Test PRoject", "description": "Test descrription", "admin_id": 11}

        result = database_wrapper.ProjectDB().create_project(json_data)

        return result



if __name__ == '__main__':
    app.run()

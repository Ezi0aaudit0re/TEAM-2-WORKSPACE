"""
    This is the main file which acts as a server 
    All the routes are specified here
"""

__author__ = "TEAM BETA"

import sys 

sys.path.insert(0, '../project')


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
        result = database_wrapper.UserDB().get_user(json_data)

        print(result)

        if result:


            # this is the part of flask_login module
            login_user(result)


            session["user_id"] = result.id
            print("Crossed")
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
    

# rouute to create a new project
@app.route(url_pre + '/project/new', methods=["POST"])
@login_required
def create_project():

    if request.method == "POST":

        json_data = {"name": "Test PRoject", "description": "Test descrription", "admin_id": 10 }

        result = database_wrapper.ProjectDB().create_project(json_data)

        return result




@app.route(url_pre + '/getBasicInfo', methods=["POST", "GET"])
@login_required
def basic_info():

    if session.get("user") is None:
        return jsonify({"code": 500, "meessage": "Internal server error"})

    # we have our user id in session["user_id"]
    # now we get the projects that the user is a part of 
    result = database_wrapper.ProjectDB().get_projects({"user_id": session['user_id']})





if __name__ == '__main__':
    app.run()

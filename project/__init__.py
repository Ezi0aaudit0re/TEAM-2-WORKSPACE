"""
    This is the main file which acts as a server 
    All the routes are specified here
    __author__ = "TEAM BETA"
"""

#from flask_cors import CORS # DRK 6/10/18 for Cross-Origin Resource Sharing (CORS); needed for Single Page Application (SPA)
from application import *
from flask import render_template, request, jsonify
import database.database_wrapper as database_wrapper 
from database.models import *


@app.route('/') # home page
def index():
    return render_template('index.html')

@app.route('/signup') # signup page
def signup():
    return render_template('signup.html')

@app.route('/project') # signup page
def project():
    return render_template('projects.html')

@app.route('/createUser', methods=["GET", "POST"]) # create a user
def create_user():
    print("Here")

    result = False

    if request.method == 'GET':
        # this is to test if the database query wrapper works
        fake_data = {"first_name": "Aman", "last_name": "Nagpal",\
                     "user_name": "anagpal4", "password": "pass",\
                     "email_id": "anagpal4@gmail.com"}

        result = database_wrapper.UserDB().create_user(fake_data)

    elif request.method == 'POST':
        # deals with the post requeust
        json_data = request.get_json()["user"]
        print(json_data)
        data = {"first_name": json_data["firstName"], "last_name": json_data["lastName"] ,\
                "user_name": json_data["username"], "password": json_data["password"],\
                "email_id": json_data["emailAddress"]}
        result = database_wrapper.UserDB().create_user(data)





    if result:
        return jsonify({"return_code": 200, "message": "Success"})
    else:
        return jsonify({"return_code": 500, "message": "Internal Server error"})



if __name__ == '__main__':
    app.run()

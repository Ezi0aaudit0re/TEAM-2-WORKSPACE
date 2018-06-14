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
#from database.models import *


@app.route('/') # home page
def index():
    return render_template('index.html')


@app.route('/create_user', methods=["GET"]) # create a user
def create_user():

    result = False

    if request.method == 'GET':
        # this is to test if the database query wrapper works
        fake_data = {"first_name": "Aman", "last_name": "Nagpal",\
                     "user_name": "anagpal4", "password": "pass",\
                     "email_id": "anagpal4@gmail.com"}

        result = database_wrapper.UserDB().create_user(fake_data)




    if result:
        return jsonify({"return_code": 200, "message": "Success"})
    else:
        return jsonify({"return_code": 500, "message": "Internal Server error"})



if __name__ == '__main__':
    app.run()

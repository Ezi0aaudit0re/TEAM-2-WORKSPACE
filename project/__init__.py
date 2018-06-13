"""
    This is the main file which acts as a server 
    All the routes are specified here
    __author__ = "TEAM BETA"
"""

#from flask_cors import CORS # DRK 6/10/18 for Cross-Origin Resource Sharing (CORS); needed for Single Page Application (SPA)
from application import *
from flask import render_template, request
from database.database_wrapper import *


@app.route('/') # home page
def index():
    return render_template('index.html')


@app.route('/create_user', methods=["POST"]) # create a user
def create_user():
    if request.method == 'POST':
        print(request.get_json())



if __name__ == '__main__':
    app.run()

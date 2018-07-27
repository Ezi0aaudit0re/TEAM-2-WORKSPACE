"""
    This is a helper file that consists of various helper methods 
    THese methods are used through out the database class
"""

__author__ = "Aman Nagpal"
__email__ = "anagpal4@bu.edu"

from application import db
from helper import hash_password
from flask import jsonify

"""
    This function gets the id of the colum of the table with two checks
    THis function is able to make two and one filter
    :param: table -> The table to query 
    :param: kwargs -> key value argument to check two things 
"""
def get_data(table, kwargs, one=True):
    try:
        keys = list(kwargs.keys())
        values = list(kwargs.values())

        if(len(keys) == 2):

            result = db.session.query(table).filter((keys[0] == values[0]), (keys[1] == values[1]))

        elif(len(keys) == 1):
            result = db.session.query(table).filter((keys[0] == values[0]))


        if one:
            return result.first()
        else:
            return result.all()

    except Exception as e:
        print("Problem in get_id function in helper")
        print(str(e))
        return None


def exception(msg, e):
    print(msg)
    print(str(e))
    return jsonify({'code': 500, 'message': 'Internal Server eror'})



"""
    This method checks if value is there or is it none
    It returns json also
"""
def check_exists_and_return_json(data, msg):
    
    if data:
        return jsonify({'code': 200, 'message': 'Success',\
                        'data': data.json() if isinstance(data, list) is False else data })
    else:
        return jsonify({'code': 404, 'message': msg})



"""
    This method checks if the user is part of a project
    :param: user_id -> The user id of the project 
    :param: project_id -> The id of the project
"""
def check_user_in_project(table, user_id, project_id):
    # get the project info based on the project id
    project = get_data(table, {table.id: project_id})

    # check if user is a part of the project
    if project:
        ids = [ user.id for user in project.users] 
        if user_id not in ids:
            return False
        else: 
            return True



"""
    This is a helper file that consists of various helper methods 
    THese methods are used through out the database class
"""

__author__ = "Aman Nagpal"
__email__ = "anagpal4@bu.edu"

from application import db
from helper import hash_password

"""
    This function gets the id of the colum of the table with two checks
    THis function is able to make two and one filter
    :param: table -> The table to query 
    :param: kwargs -> key value argument to check two things 
"""
def get_data(table, kwargs):
    try:
        keys = list(kwargs.keys())
        values = list(kwargs.values())

        if(len(keys) == 2):

            result = db.session.query(table).filter((keys[0] == values[0]), (keys[1] == values[1])).first()

        elif(len(keys) == 1):
            result = db.session.query(table).filter((keys[0] == values[0])).first()


        return result

    except Exception as e:
        print("Problem in get_id function in helper")
        print(str(e))
        return None

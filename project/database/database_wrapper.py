"""
    This file creates a wrapper for database queries

"""
__author__ = "TEAM BETA"

from application import db
from database.models import *


"""
    THis function is used to add column to a particular table
    :param: table_name the name of the table to add to
    :param: key-value arguments of the columns
"""
def add_row(table_name, **kwargs):
    print(table_name)
    print(kwargs)

"""
    This test file contains unit tests for issues backend
    Depends on User and Project functionality
    To run install pytest then in the command window simply type pytest
"""

import pytest

from database.models import Project, Issue, User
from database.database_wrapper import IssuesDB, UserDB, ProjectDB
import database.database_helper as database_helper

#Create test data
issue_1_for_project_1 ={}
def create_test_data():
    #create user
    user_1 = {"first_name":"Benon", "last_name":"Garuka", "user_name":"Benon Garuka", \
    "password":"password", "email_id":"benongaruka@yahoo.com"}
    project_id = 0
    user_id = 0
    temp = UserDB().create_user(user_1)
    if temp["return_code"] == 200:
        user_id = database_helper.get_data(User, {User.user_name:"benongaruka"}).id
        project_1 = {"name":"issues unit test", "project for issue unit tests": "admin_id": admin_id}
        temp = ProjectDB().create_proect(project_1)

        project_id = database_helper.get_data(Project, {Project.name:"Issues unit test"}).id
    else:
        print("Error creating issues test data")

    issue_1_for_project_1 = {"subject":"Issue unit test", "description":"Issue for unit test", \
    "priority":1, "projects_id":project_id,"created_by_user":user_id, "assigned_to_user": user_id, "status":0}

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
    project_id = -1
    user_id = -1
    temp = UserDB().create_user(user_1)
    if temp["return_code"] == 200:
        user_id = database_helper.get_data(User, {User.user_name:"benongaruka"}).id
        project_1 = {"name":"issues unit test", "project for issue unit tests": "admin_id": admin_id}
        temp = ProjectDB().create_proect(project_1)
        if temp["code"] == 200:
            project_id = database_helper.get_data(Project, {Project.name:"Issues unit test"}).id
    else:
        print("Error creating user")
        return {}
    if project_id != -1 and user_id != -1:
        return {"user_id":user_id, "project_id":project_id}
    else:
        return {}
"""
    This unit test tests creation of a new issue
"""
def test_create_new_issue():
    user_and_project = create_test_data()
    user_id = user_and_project["user_id"]
    project_id = user_and_project["project_id"]

    result = IssueDB().create_issue({"subject":"Test issue", "description":"This is a test issue for unit tests",\
    "projects_id":project_id, "created_by_user_id":user_id, "assigned_to_user_id":user_id,\
    })

    assert result["code"] == 200

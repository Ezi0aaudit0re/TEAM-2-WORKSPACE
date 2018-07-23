"""
    This test file contains unit tests for issues backend
    Depends on User and Project functionality
    To run install pytest then in the command window simply type pytest
"""
import sys
sys.path.append("../")

import pytest

from database.models import Project, Issue, User
from database.database_wrapper import IssueDB, UserDB, ProjectDB
import database.database_helper as database_helper
from flask import json

"""
    This unit test tests creation of a new issue by an project admin and assigned to himself
"""
def test_create_new_issue(test_client, init_database, test_project, test_users):

    #user_1 creates an issue on project
    user_1 = test_users["user_1"]
    issue = {"subject":"Test issue 1", "description":"This is a test issue for unit tests",\
    "projects_id":test_project.id, "created_by_user_id":user_1.id, "assigned_to_user_id":user_1.id}

    with test_client as client:
        result = client.post("/api/issue/new", data=json.dumps({"issue": issue}), content_type='application/json')

    assert json.loads(result.data)["code"] == 200, json.loads(result.data)["message"]

"""
    This unit test test creation of a new issue by a project admin assigned to a user who is a member of that group
"""
def test_create_new_issue_assign_member(test_client, init_database, test_project, test_users):
    user_1 = test_users["user_1"]
    user_2 = test_users["user_2"]
    issue = {"subject":"Test issue 1", "description":"This is a test issue for unit tests",\
    "projects_id":test_project.id, "created_by_user_id":user_1.id, "assigned_to_user_id":user_2.id}

    with test_client as client:
        result = client.post("/api/issue/new", data = json.dumps({"issue":issue}), content_type="application/json")
    assert json.loads(result.data)["code"] == 200, json.loads(result.data)["message"]

"""
    This unit test tests creation of a new issue and assigned to non member
"""
def test_create_new_issue_assign_non_member(test_client, init_database, test_project, test_users):
    user_1 = test_users["user_1"]
    user_3 = test_users["user_3"]
    issue = {"subject":"Test issue 1", "description":"This is a test issue for unit tests",\
    "projects_id":test_project.id, "created_by_user_id":user_1.id, "assigned_to_user_id":user_3.id}

    with test_client as client:
        result = client.post("/api/issue/new", data = json.dumps({"issue":issue}), content_type="application/json")
    
    assert json.loads(result.data)["code"] == 404
    #assert "Assigned to user is not assigned to the project" in json.loads(result.data)["message"]



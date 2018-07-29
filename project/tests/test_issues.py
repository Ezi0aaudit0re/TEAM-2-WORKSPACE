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
def test_create_new_issue(test_client, init_database, request_context, test_project, auth_user):

    #user_1 creates an issue on project
    issue = {"subject":"Same user", "description":"This is a test issue for unit tests",\
    "projects_id":test_project.id, "created_by_user_id":auth_user.id, "assigned_to_user_email":auth_user.email_id}

    with request_context:
        result = test_client.post("/api/issue/new", data=json.dumps({"issue": issue}), content_type='application/json')

    assert json.loads(result.data)["code"] == 200, json.loads(result.data)["message"]

"""
    This unit test test creation of a new issue by a project admin assigned to a user who is a member of that group
"""
def test_create_new_issue_assign_member(test_client, init_database, request_context, test_project, test_users, auth_user):
    user_2 = test_users["user_2"]
    issue = {"subject":"Assign member", "description":"This is a test issue for unit tests",\
    "projects_id":test_project.id, "created_by_user_id":auth_user.id, "assigned_to_user_email":user_2.email_id}

    with request_context:
        result = test_client.post("/api/issue/new", data = json.dumps({"issue":issue}), content_type="application/json")
    assert json.loads(result.data)["code"] == 200, json.loads(result.data)["message"]

"""
    This unit test tests creation of a new issue and assigned to non member
"""
def test_create_new_issue_assign_non_member(test_client, init_database, request_context, test_project, test_users, auth_user):
    user_3 = test_users["user_3"]
    issue = {"subject":"Assign non member", "description":"This is a test issue for unit tests",\
    "projects_id":test_project.id, "created_by_user_id":auth_user.id, "assigned_to_user_email":user_3.email_id}

    with request_context:
        result = test_client.post("/api/issue/new", data = json.dumps({"issue":issue}), content_type="application/json")
    
    assert json.loads(result.data)["code"] == 404, "Assigning to non member failed"
    #assert "Assigned to user is not assigned to the project" in json.loads(result.data)["message"]

"""
    This unit test tests retrieving user issues
"""
def test_retrieve_user_issues(test_client, init_database, request_context, test_project, test_users):
    auth_user = test_users["user_1"]
    issue = {"subject":"Issue for retrieval", "description":"This is a test issue for unit tests",\
    "projects_id":test_project.id, "created_by_user_id":auth_user.id, "assigned_to_user_email":auth_user.email_id}
    print(auth_user.email_id)
    with request_context:
        test_client.post('/authenticate', data={"emailUsername":auth_user.email_id, "password": auth_user.password}, \
        follow_redirects=True)
        test_client.post("/api/issue/new", data = json.dumps({"issue":issue}), content_type="application/json")
        result = test_client.post("/api/getUserIssues")
    print(result.data)
    assert json.loads(result.data)["code"] == 200, "Retrieving issues failed"

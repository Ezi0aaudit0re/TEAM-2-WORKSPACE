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
    auth_user = login(test_users["user_1"], test_client)
    #user_1 creates an issue on project
    result = create_test_issue(test_client,auth_user, test_project)

    assert json.loads(result["post_response"].data)["code"] == 200, json.loads(result["post_response"].data)["message"]

"""
    This unit test test creation of a new issue by a project admin assigned to a user who is a member of that group
"""
def test_create_new_issue_assign_member(test_client, init_database, test_project, test_users):
    auth_user = login(test_users["user_1"], test_client)
    result = create_test_issue(test_client,auth_user, test_project, test_users["user_2"].email_id)

    assert json.loads(result["post_response"].data)["code"] == 200, json.loads(result["post_response"].data)["message"]

"""
    This unit test tests creation of a new issue and assigned to non member
"""
def test_create_new_issue_assign_non_member(test_client, init_database, test_project, test_users):
    auth_user = login(test_users["user_1"], test_client)
    result = create_test_issue(test_client, auth_user, test_project, test_users["user_3"].email_id)
    
    assert json.loads(result["post_response"].data)["code"] == 404, json.loads(result["post_response"].data)["message"]
    #assert "Assigned to user is not assigned to the project" in json.loads(result.data)["message"]

"""
    This unit test tests retrieving user issues
"""
def test_retrieve_user_issues(test_client, init_database, test_project, test_users):
    auth_user = login(test_users["user_1"], test_client)
    result = test_client.post("/api/getUserIssues")
    assert json.loads(result.data)["code"] == 200, json.loads(result.data)["message"]

def test_update_issue(test_client, init_database, test_project, test_users):
    auth_user = login(test_users["user_1"], test_client)
    create_response = create_test_issue(test_client, auth_user, test_project)
    result = test_client.post("api/issue/update", data = {"issue": {"priority":2, "status":0}, "issueId":create_response["new_issue"].id})
    assert json.loads(result.data)["code"] == 200, "updating issue failed"

def create_test_issue(client, create_user, project, assign_user_email = None):
    from database import database_helper
    from database.models import Issue

    if assign_user_email == None:
        assign_user_email = create_user.email_id
    
    issue = {"subject":"Automatic issue for testing", "description":"This is a test issue for unit tests",\
    "created_by_user_id":create_user.id, "user":{"email":assign_user_email}}

    result = client.post("/api/issue/new", data = json.dumps({"projectId":project.id,"issue":issue}), content_type="application/json")
    issue = database_helper.get_data(Issue, {Issue.subject:issue["subject"]})

    return {"new_issue":issue, "post_response":result}

def login(user, c):
    auth_user = user
    c.post('/authenticate', data={"emailUsername":auth_user.email_id, "password": "password"}, \
        follow_redirects=True)
    return auth_user
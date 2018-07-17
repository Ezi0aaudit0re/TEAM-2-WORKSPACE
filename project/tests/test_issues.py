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
    This unit test tests creation of a new issue
"""
def test_create_new_issue(test_client, init_database, create_db_entries):
    response = IssueDB().create_issue({"subject":"Test issue 1", "description":"This is a test issue for unit tests",\
    "projects_id":project_id, "created_by_user_id":user_id, "assigned_to_user_id":user_id,})
    assert json.loads(response.data)["code"] == 200

def test_get_user_issues(test_client, init_database, create_db_entries):
    response = IssueDB().get_user_issues(user_id)
    assert json.loads(response.data)["code"] == 200


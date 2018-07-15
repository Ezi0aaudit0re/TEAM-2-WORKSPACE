import sys
sys.path.append("../")

import pytest
from database.models import Project, Issue, User
from application import app, db

project_id = -1
user_id = -1
@pytest.fixture(scope='module')
def test_client():
    '''Sets up test flask client'''
    app.config['TESTING'] = True
    testing_client = app.test_client()
    ctx = app.app_context()
    ctx.push()

    yield testing_client

    ctx.pop()

@pytest.fixture(scope="module")
def init_database():
    '''Initializes db for testing'''
    # Create the database and the database database_helper
    db.create_all()

    #Insert User and Project
    user_1 = User(first_name="Benon", last_name="Garuka", user_name="benongaruka", password="password", email_id="benongaruka@yahoo.com")
    db.session.add(user_1)
    db.session.commit()
    user_id = user_1.id
    project_1 = Project(name="test project", description="this is a test project", admin_id = user_1.id)
    db.session.add(project_1)
    db.session.commit()
    project_id = project_1.id

    yield db

    db.drop_all()

@pytest.fixture
def project_id():
    return project_id
@pytest.fixture
def user_id():
    return user_id

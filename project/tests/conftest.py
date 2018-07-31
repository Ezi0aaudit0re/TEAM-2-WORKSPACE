import sys
sys.path.append("../")

import pytest

@pytest.fixture(scope='session')
def test_client():
    from application import app, login_manager
    '''Sets up test flask client'''
    app.config['TESTING'] = True
    login_manager.init_app(app)
    testing_client = app.test_client()
    ctx = app.app_context()
    ctx.push()
    yield testing_client
    #clean up db
    ctx.pop()

@pytest.fixture(scope="session")
def request_context():
    from application import app
    return app.test_request_context()

@pytest.fixture(scope="session")
def init_database():
    from main import app, db
    from flask_sqlalchemy import SQLAlchemy
    '''Initializes db for testing'''    
    #Test
    create_test_db(db)
    yield db
    clean_up_db(db)

def create_test_db(db):
    # Create the database
    #Add records for testing
    from database.models import Project, User, Issue
    from database import database_wrapper

    user_1 = {"first_name":"test", "last_name":"user1", "user_name":"testuser1", "password":"password", "email_id":"testuser1@yahoo.com"}
    database_wrapper.UserDB().create_user(user_1)
    user_2 = {"first_name":"test", "last_name":"user2", "user_name":"testuser2", "password":"password", "email_id":"testuser2@yahoo.com"}
    database_wrapper.UserDB().create_user(user_2)
    user_3 = {"first_name":"test", "last_name":"user3", "user_name":"testuser3", "password":"password", "email_id":"testuser3@yahoo.com"}
    database_wrapper.UserDB().create_user(user_3)
    user_1_id = db.session.query(User).filter(User.email_id=="testuser1@yahoo.com").first().id
    project_1 = Project(name="testissuesproject", description="this is a test project", admin_id = user_1_id)
    user_2 = db.session.query(User).filter(User.email_id=="testuser2@yahoo.com").first()
    project_1.users.append(user_2)
    db.session.add(project_1)
    db.session.commit()

def clean_up_db(db):
    from database.models import Project, User, Issue
    #Clean up db
    db.session.query(Issue).filter(Issue.subject=="Automatic issue for testing").delete()
    db.session.query(Project).filter(Project.name=="testissuesproject").first().users = []
    db.session.commit()
    db.session.query(Project).filter(Project.name=="testissuesproject").delete()
    db.session.query(User).filter(User.user_name=="testuser1").delete()
    db.session.query(User).filter(User.user_name=="testuser2").delete()
    db.session.query(User).filter(User.user_name=="testuser3").delete()
    db.session.query(User).filter(User.user_name=="auth_user").delete()
    db.session.commit()

@pytest.fixture(scope="session")
def test_project(init_database):
    from database.models import Project

    project = init_database.session.query(Project).filter(Project.name == "testissuesproject").first()
    return project

@pytest.fixture(scope="session")
def test_users(init_database):
    from database.models import User

    user_1 = init_database.session.query(User).filter(User.email_id == "testuser1@yahoo.com").first()
    user_2 = init_database.session.query(User).filter(User.email_id == "testuser2@yahoo.com").first()
    user_3 = init_database.session.query(User).filter(User.email_id == "testuser3@yahoo.com").first()
    return {"user_1":user_1, "user_2":user_2, "user_3":user_3}

"""
@pytest.fixture(scope="session")
def auth_user(init_database, test_client, request_context, test_users):
    #Authenticates user_1
    auth_user = test_users["user_1"]
    request_context = request_context
    with request_context:
        test_client.post('/authenticate', data={"emailUsername":auth_user.email_id, "password": auth_user.password}, \
        follow_redirects=True)
    return auth_user
"""



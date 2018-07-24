import sys
sys.path.append("../")

import pytest

@pytest.fixture(scope='module')
def test_client():
    from application import app
    '''Sets up test flask client'''
    app.config['TESTING'] = True
    testing_client = app.test_client()
    ctx = app.app_context()
    ctx.push()
    yield testing_client
    #clean up db
    ctx.pop()

@pytest.fixture(scope="module")
def init_database():
    from database.models import Project, User, Issue
    from main import app, db
    '''Initializes db for testing'''
    # Create the database
        #Add records for testing
    user_1 = User(first_name="test", last_name="user1", user_name="testuser1", password="password", email_id="testuser1@yahoo.com")
    user_2 = User(first_name="test", last_name="user2", user_name="testuser2", password="password", email_id="testuser2@yahoo.com")
    user_3 = User(first_name="test", last_name="user3", user_name="testuser3", password="password", email_id="testuser3@yahoo.com")
    db.session.add_all([user_1,user_2,user_3])
    db.session.commit()
    user_1_id = db.session.query(User).filter(User.email_id=="testuser1@yahoo.com").first().id
    project_1 = Project(name="testissuesproject", description="this is a test project", admin_id = user_1_id)
    user_2 = db.session.query(User).filter(User.email_id=="testuser2@yahoo.com").first()
    project_1.users.append(user_2)
    db.session.add(project_1)
    db.session.commit()
    #Test
    yield db

    #Clean up db
    db.session.query(Issue).filter(Issue.subject=="Assign member").delete()
    db.session.query(Issue).filter(Issue.subject=="Assign non member").delete()
    db.session.query(Issue).filter(Issue.subject=="Same user").delete()
    db.session.query(Project).filter(Project.name=="testissuesproject").first().users = []
    db.session.commit()
    db.session.query(Project).filter(Project.name=="testissuesproject").delete()
    db.session.query(User).filter(User.user_name=="testuser1").delete()
    db.session.query(User).filter(User.user_name=="testuser2").delete()
    db.session.query(User).filter(User.user_name=="testuser3").delete()
    db.session.commit()

@pytest.fixture(scope="module")
def test_project(init_database):
    from database.models import Project

    project = init_database.session.query(Project).filter(Project.name == "testissuesproject").first()
    return project

@pytest.fixture(scope="module")
def test_users(init_database):
    from database.models import User

    user_1 = init_database.session.query(User).filter(User.email_id == "testuser1@yahoo.com").first()
    user_2 = init_database.session.query(User).filter(User.email_id == "testuser2@yahoo.com").first()
    user_3 = init_database.session.query(User).filter(User.email_id == "testuser3@yahoo.com").first()
    return {"user_1":user_1, "user_2":user_2, "user_3":user_3}



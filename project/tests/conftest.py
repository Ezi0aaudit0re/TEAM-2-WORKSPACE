import sys
sys.path.append("../")

import pytest
from database.models import Project, Issue, User
from application import app, db

@pytest.fixture(scope='session')
def test_client():
    '''Sets up test flask client'''
    app.config['TESTING'] = True
    testing_client = app.test_client()
    ctx = app.app_context()
    ctx.push()
    #Add records for testing
    user_1 = User(first_name="test", last_name="automated", user_name="automatedtest", password="password", email_id="automatedtest@yahoo.com")
    db.session.add(user_1)
    db.session.commit()
    project_1 = Project(name="test project", description="this is a test project", admin_id = user_1.id)
    db.session.add(project_1)
    db.session.commit()
    yield testing_client
    #clean up db
    db.session.query(User).filter(User.id==user_1.id).delete()
    db.session.query(Project).filter(Project.id==project_1.id).delete()
    ctx.pop()

@pytest.fixture(scope="session")
def init_database():
    '''Initializes db for testing'''
    # Create the database
    db.create_all()
    #Insert User and Project
    yield db

    db.drop_all()


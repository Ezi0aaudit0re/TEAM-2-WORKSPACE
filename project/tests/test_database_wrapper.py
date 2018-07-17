"""
    This file contains test for database wrapper file
"""
import os, sys
import unittest
import json

sys.path.append('../')


from database.database_wrapper import *


class BaseClass(unittest.TestCase):

    def setUp(self):
        from main import db, app
        self.app = app
        self.client = app.test_client()
        self.client.testing = True
        self.user_db = UserDB()
        self.new_user= {"first_name": "Automated",\
                        "last_name": "Test",\
                        "user_name": "automated_test", \
                        "password": "pass", \
                        "email_id": "automated@test.com"}


    def create_user(self):
        return self.user_db.create_user(self.new_user)

    def authenticate_user(self):
        with self.app.test_request_context():
            self.client.post('/authenticate', data={"emailUsername":self.new_user['email_id'], "password": self.new_user['password']}, \
                        follow_redirects=True)
            response = self.client.post('/api/getBasicInfo')
            response = json.loads(response.data)
            return response
    


    """
        This method makes an ajax request 
        Converts json to python dictionary
    """
    def make_request(self, route, params=None):
        with self.app.test_request_context():
            if params:
                response = self.client.post(route, data=params, content_type='application/json')
            else:
                response = self.client.post(route)

            response = json.loads(response.data)
            return response



    def tearDown(self):
        from main import db
        from database.models import User
        db.session.query(User).filter((User.user_name == "automated_test")).delete()
        db.session.commit()




"""
    UserDB tests
"""
class UserDBTest(BaseClass):
    
    def setUp(self):
        super().setUp()


    def test_create_user(self):
        response = super().create_user()
        self.assertEqual(response['code'], 200, msg="{}".format(response))

    def test_create_existing_user(self):
        super().create_user()
        response = super().create_user()
        self.assertEqual(response['code'], 403, "Creating an existing user not working properly")

    def test_login_username(self):
        self.test_create_user()
        response = self.user_db.authenticate_user({"emailUsername": self.new_user['user_name'], "password": self.new_user['password']})
        self.assertEqual(response.user_name, self.new_user['user_name'],  'There was some prroblem logging in with username')


    def test_login_email_id(self):
        self.test_create_user()
        response = self.user_db.authenticate_user({"emailUsername": self.new_user['email_id'], "password": self.new_user['password']})
        self.assertEqual(response.email_id, self.new_user['email_id'],  'There was some problem logging in with email_id')

    def test_incorrrect_login_email_id(self):
        self.test_create_user()
        response = self.user_db.authenticate_user({"emailUsername": self.new_user['email_id'], "password": 'xyz'})
        self.assertEqual(response, None,  'loggin in with incorrect credentials')

    def test_get_user_data(self):
        self.test_create_user()
        response = super().authenticate_user()
        self.assertEqual(response['data']['email_id'], self.new_user['email_id'], "Getting basic info is not working")


    def test_get_basic_info(self):
        # create a userr
        super().create_user()
        # authenticate the user so that we can make the request
        super().authenticate_user()

        # make the request
        response = super().make_request('/api/getBasicInfo')
        
        self.assertEqual(response['code'], 200)




    def tearDown(self):
        super().tearDown()




"""
    This class consists of all the ProjectDB class test
"""
class ProjectDBTest(BaseClass):


    def setUp(self):
        super().setUp()
        # we create a user to do our project related tests with
        super().create_user()
        # authenticate the useer
        user = super().authenticate_user()
        self.project_db = ProjectDB()
        self.new_project = {'name': 'Automated Test',\
                            'description': 'Automated Description',\
                            'admin_id': user['data']['id'] 
                           }


    
    def test_create_new_project(self):
        # create a prokect with that user as the admin
        response = super().make_request('/api/project/new', json.dumps({"project": self.new_project}))
        self.assertEqual(response["code"], 200, "Problem creating a project")

    def test_create_existing_project(self):
        self.test_create_new_project()
        response = super().make_request('/api/project/new', json.dumps({"project": self.new_project}))
        self.assertEqual(response["code"], 403, "Problem when creating an existing project")



    def test_get_project(self):
        # create a project and then gets it id 
        pass


    def tearDown(self):
        super().tearDown()
        from database.models import Project
        from main import db
        db.session.query(Project).filter((Project.name == self.new_project['name'])).delete()
        db.session.commit()

    """
        This tests if the get basic info call gets projects also 
    """
    def test_get_basic_info_has_projects(self):
        self.test_create_new_project()

        # make the request
        response = super().make_request('/api/getBasicInfo')


        #check if we get projects also
        self.assertGreaterEqual(len(response['data']['projects']), 1, 'Problem retrieving project'  )






if __name__ == "__main__":
    unittest.main()


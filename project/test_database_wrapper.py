"""
    This file contains test for database wrapper file
"""
import os
import unittest
import json


from database.database_wrapper import *



"""
    UserDB tests
"""
class UserDBTest(unittest.TestCase):
    
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


    def test_create_user(self):
        response = self.user_db.create_user(self.new_user)
        self.assertEqual(response['code'], 200, msg="{}".format(response))

    def test_create_existing_user(self):
        self.test_create_user()
        response = self.user_db.create_user(self.new_user)
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
        with self.app.test_request_context():
            self.client.post('/authenticate', data={"emailUsername":self.new_user['email_id'], "password": self.new_user['password']}, \
                        follow_redirects=True)
            response = self.client.post('/api/getBasicInfo')
            response = json.loads(response.data)
            self.assertEqual(response['data']['email_id'], self.new_user['email_id'], "Getting basic info is not working")



    def tearDown(self):
        from main import db
        from database.models import User
        db.session.query(User).filter((User.user_name == "automated_test")).delete()
        db.session.commit()





if __name__ == "__main__":
    unittest.main()


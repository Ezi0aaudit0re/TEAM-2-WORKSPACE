"""
    This file contains test for database wrapper file
"""
import os, sys
import unittest
import json

sys.path.append(os.getcwd())
from database.database_wrapper import *


"""
    UserDB tests
"""
class UserDBTest(unittest.TestCase):
    
    def setUp(self):
        self.user_db = UserDB()
        self.new_user= {User.first_name: "Automated",\
                        User.last_name: "Test",\
                        User.user_name: "automated_test", \
                        User.password: "pass", \
                        User.email_id: "automated@test.com"}


    def test_create_user(self):
        response = self.user_db.create_user(self.new_user)
        self.assertEqual(response["code"], 200, msg="{}".forrmat(response))





    def tearDown(self):
        # delete the user that we just created
        pass





if __name__ == "__main__":
    unittest.main()


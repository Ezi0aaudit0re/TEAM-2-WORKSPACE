"""
    This is the helper file it consists of various helper functions that  are used throughout the project
"""

__author__ = "Aman Nagpal"
__email__ = "anagpal4@bu.edu"


import hashlib, uuid
from constants import SALT




def hash_password(password):
    salt = uuid.uuid4().hex
    hashed_password = hashlib.sha512(str.encode(password + SALT)).hexdigest()
    return hashed_password

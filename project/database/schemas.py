"""
    These are all the schemas these are used to convert data 
    from the database into json 
"""

__author__ = "Team Beta"
__email__ = "amannagpal4@gmail.com"

from application import ma
from database.models import *

class UserSchema(ma.ModelSchema):
    class Meta:
        model = User


class ProjectSchema(ma.ModelSchema):
    class Meta:
        model = Project
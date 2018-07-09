# coding: utf-8
from sqlalchemy import Column, DateTime, ForeignKey, INTEGER, String, Table, text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
import time
from flask_login import UserMixin
from application import db

Base = declarative_base()
metadata = Base.metadata


t_users_has_projects = Table(
    'users_has_projects', metadata,
    Column('users_id', ForeignKey('users.id'), primary_key=True, nullable=False, index=True),
    Column('projects_id', ForeignKey('projects.id'), primary_key=True, nullable=False, index=True)
)

class Project(Base):
    __tablename__ = 'projects'

    id = Column(INTEGER(), primary_key=True, unique=True)
    name = Column(String(255), nullable=False)
    description = Column(String(255))
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    admin_id = Column(String(45), nullable=False)
    status = Column(INTEGER(), nullable=False, server_default=text("'0'"))

    users = relationship('User', secondary='users_has_projects')

    def __init__(self, **kwargs):
        current_time = time.strftime('%Y-%m-%d %H:%M:%S')

        self.name = kwargs["name"]
        self.description = kwargs["description"]
        self.created_at = current_time
        self.updated_at = current_time
        self.admin_id = kwargs["admin_id"] #This is the id of the user who creates the project

    def json(self):
        return {'id': self.id,\
                'name': self.name,\
                'description': self.description\
               }

class User(UserMixin, Base):

    __tablename__ = 'users'

    id = Column(INTEGER(), primary_key=True, unique=True)
    first_name = Column(String(255), nullable=False)
    last_name = Column(String(255), nullable=False)
    user_name = Column(String(255), nullable=False, unique=True)
    password = Column(String(255), nullable=False)
    email_id = Column(String(255), nullable=False, unique=True)
    privilege = Column(INTEGER(), nullable=False, server_default=text("'0'"))
    projects = relationship('Project', secondary=t_users_has_projects)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

    def __init__(self, **kwargs):
        current_time = time.strftime('%Y-%m-%d %H:%M:%S')

        self.first_name = kwargs["first_name"]
        self.last_name = kwargs["last_name"]
        self.user_name = kwargs["user_name"]
        self.password = kwargs["password"]
        self.email_id = kwargs["email_id"]
        self.privilege = 0
        self.created_at = current_time
        self.updated_at = current_time

    def json(self):
        serialized_projects = list()

        for project in self.projects:
            serialized_projects.append({'id': project.id, \
                                        'status': project.status, \
                                        'name': project.name \
            })

        return {'id': self.id, \
               'first_name': self.first_name,\
               'last_name': self.last_name,\
               'user_name': self.user_name,\
               'email_id': self.email_id,\
               'privilege': self.privilege,\
               'projects': serialized_projects,\
               'created_at': self.created_at, \
               'updated_at': self.updated_at }



class Issue(Base):
    __tablename__ = 'issues'

    id = Column(INTEGER(), primary_key=True)
    subject = Column(String(45), nullable=False)
    description = Column(String(255))
    priority = Column(INTEGER(), nullable=False, server_default=text("'0'"))
    projects_id = Column(ForeignKey('projects.id'), nullable=False, index=True)
    created_by_user_id = Column(ForeignKey('users.id'), nullable=False, index=True)
    assigned_to_user_id = Column(ForeignKey('users.id'), nullable=False, index=True)
    created_at = Column(DateTime, nullable=False)
    updated_at = Column(DateTime, nullable=False)
    status = Column(INTEGER(), nullable=False, server_default=text("'0'"))
    tested = Column(INTEGER(), server_default=text("'0'"))

    assigned_to_user = relationship('User', primaryjoin='Issue.assigned_to_user_id == User.id')
    created_by_user = relationship('User', primaryjoin='Issue.created_by_user_id == User.id')
    projects = relationship('Project')


class Message(Base):
    __tablename__ = 'messages'

    id = Column(INTEGER(), primary_key=True)
    msg = Column(String(255), nullable=False)
    users_id = Column(ForeignKey('users.id'), nullable=False, index=True)
    projects_id = Column(ForeignKey('projects.id'), nullable=False, index=True)
    created_at = Column(DateTime)
    stored_at = Column(DateTime)

    projects = relationship('Project')
    users = relationship('User')

    def __init__(self, **data):
        current_time = time.strftime('%Y-%m-%d %H:%M:%S')

        self.msg = data['msg']
        self.user_id = data['user_id']
        self.projects_id = data['project_id']
        self.created_at = data['created_at']
        self.stored_at = current_time


class Task(Base):
    __tablename__ = 'tasks'

    id = Column(INTEGER(), primary_key=True)
    name = Column(String(45), nullable=False)
    description = Column(String(255))
    priority = Column(INTEGER(), nullable=False, server_default=text("'0'"))
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    due_date = Column(DateTime, nullable=False)
    assigned_to_user_id = Column(ForeignKey('users.id'), nullable=False, index=True)
    assigned_by_user_id = Column(ForeignKey('users.id'), nullable=False, index=True)
    projects_id = Column(ForeignKey('projects.id'), nullable=False, index=True)
    status = Column(INTEGER(), nullable=False, server_default=text("'0'"))

    assigned_by_user = relationship('User', primaryjoin='Task.assigned_by_user_id == User.id')
    assigned_to_user = relationship('User', primaryjoin='Task.assigned_to_user_id == User.id')
    projects = relationship('Project')




class Comment(Base):
    __tablename__ = 'comments'

    id = Column(INTEGER(), primary_key=True)
    comments = Column(String(255))
    users_id = Column(ForeignKey('users.id'), nullable=False, index=True)
    tasks_id = Column(ForeignKey('tasks.id'), nullable=False, index=True)

    tasks = relationship('Task')
    users = relationship('User')

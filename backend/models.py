from dataclasses import dataclass
from email.policy import default
from enum import unique
from xmlrpc.client import boolean
from werkzeug.security import generate_password_hash, check_password_hash
import app

@dataclass
class User(app.database.Model):
    __tablename__='users'
    id = app.database.Column(app.database.Integer(), primary_key=True)
    email =app.database.Column(app.database.String(120), unique=True, nullable=False)
    password =app.database.Column(app.database.String(255),nullable=False)
    tasks = app.database.relationship('Task', backref="creator",lazy=False)
    jwt_token = app.database.Column(app.database.String(240), nullable=True)

    def __init__(self, email, password):
        super().__init__()
        self.email = email
        self.password = generate_password_hash(password, method='sha256')
        print(self.password)


    @classmethod
    def athenticate(cls, **kwargs):
        email = kwargs.get('email')
        password = kwargs.get('password')

        if not email or not password:
            return None

        user = cls.query.filter_by(email=email).first()
        if not user or not check_password_hash(user.password, password):
            return None

        return user

    def to_dict(self):
        return dict(id=self.id, email=self.email)

@dataclass
class Task(app.database.Model):
    id:int
    completed: boolean
    description: str

    id = app.database.Column(app.database.Integer(), primary_key=True)
    completed = app.database.Column(app.database.Boolean(),default=False)
    description = app.database.Column(app.database.String(140))
    creator_id =app.database.Column(app.database.Integer, app.database.ForeignKey('users.id'))

    def __init__(self,*args,**kwargs) -> None:
        super().__init__(*args,**kwargs)

    def __repr__(self) -> str:
        return f'< id: {self.id} - {self.description}'

    def to_dict(self):
        return dict(id=self.id, description=self.description,completed=self.completed)

@dataclass
class Token(app.database.Model):
    __tablename__="token"
    id:int
    jwt_token: str

    id = app.database.Column(app.database.Integer(), primary_key=True)
    jwt_token = app.database.Column(app.database.String(240), nullable=True)


    def __init__(self,*args,**kwargs) -> None:
        super().__init__(*args,**kwargs)
from flask import Flask
from flask import request,current_app,jsonify,Blueprint
from datetime import datetime, timedelta

from dotenv import load_dotenv

from flask_sqlalchemy import SQLAlchemy

from config import Config

from flask_cors import CORS, cross_origin
from functools import wraps

from decorator import crossdomain
import jwt


load_dotenv('./.flaskenv')

app = Flask(__name__)
app.config.from_object(Config)

configuration = {
  'ORIGINS': [
    'http://localhost:8080', 
  ],

}
""" @app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', '*')
  response.headers.add('Access-Control-Allow-Methods', '*')
  response.headers.add('Access-Control-Allow-Credentials', 'true')
  return response """
""" CORS_ALLOW_ORIGIN="*,*"
CORS_EXPOSE_HEADERS="*,*"
CORS_ALLOW_HEADERS="content-type,*"

cors = CORS(app, origins=CORS_ALLOW_ORIGIN.split(","), allow_headers=CORS_ALLOW_HEADERS.split(",") , expose_headers= CORS_EXPOSE_HEADERS.split(","),   supports_credentials = True)  """
CORS(app,ressources={
    r"/*": {'origins':'http://localhost:8080'}},supports_credentials=True)


if __name__ ==  '__main__':
    app.run(port=5050)

database = SQLAlchemy(app)

import models

@app.before_first_request
def create_tables():
    database.create_all()

@app.route('/',methods=['GET'])
def tasks():
    tasks = models.Task.query.all()
    print(tasks)
    return jsonify(tasks)


def token_required(f):
    @wraps(f)
    def _verify(*args, **kwargs):
        print("Verification")
        auth_headers = request.headers.get('Authorization', '').split()
        print(auth_headers)

        invalid_msg = {
            'message': 'Invalid token. Registeration and / or authentication required',
            'authenticated': False
        }
        expired_msg = {
            'message': 'Expired token. Reauthentication required.',
            'authenticated': False
        }

        if len(auth_headers) != 2:
            print("wouté akk gnarr")
            return jsonify(invalid_msg), 401

        try:
            token = auth_headers[1]
            data = jwt.decode(token, current_app.config['SECRET_KEY'])
            user = models.User.query.filter_by(email=data['sub']).first()
            print("avant si")
            if not user:
                print("user not found")
                raise RuntimeError('User not found')
            return f(user, *args, **kwargs)
        except jwt.ExpiredSignatureError:
            print("Expired")
            return jsonify(expired_msg), 401 # 401 is Unauthorized HTTP status code
        except (jwt.InvalidTokenError, Exception) as e:
            print(e)
            return jsonify(invalid_msg), 401

    return _verify

@app.route('/create',methods=['POST','OPTIONS'])
@crossdomain(origin='*')
@token_required
def create_task():
    print("in create tasks")
    receivedData = request.get_json()
    print(receivedData)
    print(receivedData)
    newTask = models.Task(description=receivedData['description'])
    database.session.add(newTask)
    database.session.commit()
    tasks = models.Task.query.all()
    print(tasks)
    return jsonify(newTask.to_dict())

@app.route('/register', methods=('POST',))
def register():
    data = request.get_json()
    
    print(data)
    user = models.User(**data)
    database.session.add(user)
    database.session.commit()
    return jsonify(user.to_dict()), 201
    
@app.route('/login', methods=('POST',))
def login():
    data = request.get_json()
    print(f"data:  {data}")
    user = models.User.athenticate(**data)
    if not user:
        return jsonify({ 'message': 'Invalid credentials', 'authenticated': False }), 401

    print(user)
    token = jwt.encode({
        'sub': user.email,
        'iat':datetime.utcnow(),
        'exp': datetime.utcnow() + timedelta(minutes=30)},
        current_app.config['SECRET_KEY'])
    return jsonify({ 'token': token.decode('UTF-8') })
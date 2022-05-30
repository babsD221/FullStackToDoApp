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
# Here you can globally configure all the ways you want to allow JWTs to
# be sent to your web application. By default, this will be only headers.
app.config["JWT_TOKEN_LOCATION"] = ["headers", "cookies", "json", "query_string"]

app_token = ""
# If true this will only allow the cookies that contain your JWTs to be sent
# over https. In production, this should always be set to True
app.config["JWT_COOKIE_SECURE"] = False

# Change this in your code!
app.config["JWT_SECRET_KEY"] = "super-secret"

configuration = {
  'ORIGINS': [
    'http://localhost:8080', 
  ],

}
CORS(app,ressources={
    r"/*": {'origins':'http://localhost:8080'}},supports_credentials=True)


if __name__ ==  '__main__':
    app.run(port=5050)

database = SQLAlchemy(app)

import models

@app.before_first_request
def create_tables():
    database.create_all()




def token_required(f):
    @wraps(f)
    def _verify(*args, **kwargs):
        print("Verification")
        auth_headers = request.headers.get('Authorization', '').split()
        print(f'request headers {request.headers}')

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


@app.route('/',methods=['GET',])
def tasks():
    id_headers = request.headers.get("User_Id",'')
    print(f' id header{id_headers}')
    print(id)
    tasks = models.Task.query.filter(models.Task.creator_id==int(id_headers)).all()
    print(tasks)
    return jsonify(tasks)

@app.route('/create',methods=['POST',])
@token_required
def create_task(current_user):
    print("in create tasks")
    receivedData = request.get_json()
    print(receivedData)
    print(receivedData)
    newTask = models.Task(description=receivedData['description'],completed=receivedData['completed'])
    newTask.creator = current_user
    database.session.add(newTask)
    database.session.commit()
    tasks = models.Task.query.all()
    print(tasks)
    return jsonify(newTask.to_dict())

@app.route('/remove',methods=['POST','OPTIONS'])
@crossdomain(origin='*')
@token_required
def remove_task(current_user):
    receivedData = request.get_json()
    print(f'reçu {receivedData}')
    task = models.Task.query.filter_by(id=int(receivedData['id'])).first_or_404()

    database.session.delete(task)
    database.session.commit()
    return jsonify({})


@app.route('/complete',methods=['POST','OPTIONS'])
@crossdomain(origin='*')
@token_required
def complete_task(current_user):
    receivedData = request.get_json()
    task = models.Task.query.filter_by(id=int(receivedData['id'])).first_or_404()
    task.completed= True
    database.session.commit()
    return jsonify({})

@app.route('/register', methods=('POST',))
def register():
    data = request.get_json()
    
    print(data)
    user = models.User(**data)
    database.session.add(user)
    database.session.commit()
    users = models.User.query.all()
    for userT in users:
        print(userT.to_dict())
    return jsonify(user.to_dict()), 201
    
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    print(f"data:  {data}")
    user = models.User.athenticate(**data)
    if not user:
        return jsonify({ 'message': 'Invalid credentials', 'authenticated': False }), 401

    token = jwt.encode({
        'sub': user.email,
        'iat':datetime.utcnow(),
        'exp': datetime.utcnow() + timedelta(minutes=30)},
        current_app.config['SECRET_KEY'])
    user.jwt_token = token
    database.session.commit()
    tokenData = models.Token(jwt_token=token.decode('UTF-8'))
    database.session.add(tokenData)
    database.session.commit()
    print(user.id)
    return jsonify({ 'token': token.decode('UTF-8'),'id':user.id })

@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"token": "0"})
    models.Token.query.delete()
    database.session.commit()
    return response

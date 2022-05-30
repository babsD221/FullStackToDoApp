from pathlib import Path
import datetime
BASE_DIR = Path(__file__).parent

class Config:
    SQLALCHEMY_DATABASE_URI= 'sqlite:///' + str(BASE_DIR.joinpath('db.sqlite'))
    SQLALCHEMY_TRACK_MODIFICATIONS=False
    CORS_ALLOW_ALL_ORIGINS=True
    CORS_SUPPORTS_CREDENTIALS=True
    CORS_HEADERS='Content_Type'
    SECRET_KEY=" fsgggggggggggggggggggggggggggggggggrdsq"
    JWT_SECRET_KEY = "dzazarazfvbgrheuygddzazgazagazzazagryhb65558"
    JWT_TOKEN_LOCATION = ['cookies']
    JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(seconds=1800)
    JWT_COOKIE_SECURE = True
    JWT_REFRESH_TOKEN_EXPIRES = datetime.timedelta(days=15)
    JWT_COOKIE_CSRF_PROTECT = True 
    JWT_ACCESS_CSRF_HEADER_NAME = "X-CSRF-TOKEN-ACCESS"
    JWT_REFRESH_CSRF_HEADER_NAME = "X-CSRF-TOKEN-REFRESH"

from pathlib import Path
BASE_DIR = Path(__file__).parent

class Config:
    SQLALCHEMY_DATABASE_URI= 'sqlite:///' + str(BASE_DIR.joinpath('db.sqlite'))
    SQLALCHEMY_TRACK_MODIFICATIONS=False
    CORS_ALLOW_ALL_ORIGINS=True
    CORS_SUPPORTS_CREDENTIALS=True
    CORS_HEADERS='Content_Type'
    SECRET_KEY=" fsgggggggggggggggggggggggggggggggggrdsq"

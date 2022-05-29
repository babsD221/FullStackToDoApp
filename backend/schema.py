from marshmallow_sqlalchemy import SQLAlchemyAutoSchema


class TaskSchema(SQLAlchemyAutoSchema):
    class Meta:
        include_relationships = True
        load_instance = True



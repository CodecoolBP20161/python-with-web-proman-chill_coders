from peewee import *

db = PostgresqlDatabase('proman', user='dorasztanko')


class BaseModel(Model):
    """A base model that will use our Postgresql database."""

    class Meta:
        database = db


class Board(BaseModel):
    """Represents a board object."""
    title = CharField()
    color = CharField()


class Card(BaseModel):
    """Represents a card object."""
    title = CharField()
    color = CharField()
    board = ForeignKeyField(Board)

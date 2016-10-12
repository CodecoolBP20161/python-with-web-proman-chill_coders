from models import *


db.drop_tables([Board, Card, Meta])
db.connect()
db.create_tables([Board, Card, Meta], safe=True)
Board.create(title='alma', color='tile-green')
Board.create(title='körte', color='tile-green')
Board.create(title='szilva', color='tile-green')
Board.create(title='banán', color='tile-green')
Card.create(title='alma1', color='tile-green', board=1)
Card.create(title='alma1', color='tile-green', board=1)
Card.create(title='alma2', color='tile-green', board=1)
Card.create(title='alma3', color='tile-green', board=1)
Meta.create(page_state='board_level')
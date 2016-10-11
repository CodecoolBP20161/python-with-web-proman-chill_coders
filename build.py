from models import *


db.drop_tables([Board, Card, Meta])
db.connect()
db.create_tables([Board, Card, Meta], safe=True)
Board.create(title='alma', color='tile-green')
Card.create(title='alma1', color='tile-green', board=1)
Meta.create(page_state='board_level')

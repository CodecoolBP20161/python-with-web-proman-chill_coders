from models import *


db.drop_tables([Board, Card])
db.connect()
db.create_tables([Board, Card], safe=True)
Board.create(title='a', color='tile-green')
Board.create(title='b', color='tile-green')
Board.create(title='c', color='tile-green')
Board.create(title='d', color='tile-green')
Card.create(title='a1', color='tile-green', board=1)
Card.create(title='a2', color='tile-green', board=1)
Card.create(title='a3', color='tile-green', board=1)
Card.create(title='b1', color='tile-green', board=2)
Card.create(title='c1', color='tile-green', board=3)
Card.create(title='d1', color='tile-green', board=4)
Card.create(title='d2', color='tile-green', board=4)

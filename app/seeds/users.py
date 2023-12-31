from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', first_name='Demo', last_name='Lition', password='password', profile_pic='https://opentables.s3.us-west-1.amazonaws.com/fubao.jpg')
    marnie = User(
        username='marnie', email='marnie@aa.io', first_name='Marnie', last_name='Kim', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io',first_name='Bobbie', last_name='Lee', password='password')
    poppy = User(
        username='poppy', email='poppy@aa.io',first_name='Poppy', last_name='Park', password='password')
    rachel = User(
        username='Rachel', email='Rachel@aa.io',first_name='Rachel', last_name='Park', password='password', profile_pic='https://opentables.s3.us-west-1.amazonaws.com/rachel.jpg')
    steven = User(
        username='steven', email='steven@aa.io',first_name='steven', last_name='Park', password='password')
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(poppy)
    db.session.add(rachel)
    db.session.add(steven)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
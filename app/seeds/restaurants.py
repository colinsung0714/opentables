from app.models import db, Restaurant, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_restaurants():
    restaurant_one = Restaurant(
        name='Khun 9 Thai Kitchen',
        restaurant_pic='https://i.pinimg.com/1200x/57/8d/b4/578db486c5420265a9684a3dd32489e2.jpg',
        phone='310-328-4888',
        street='2018 W Carson St',
        city='Torrance',
        state='CA',
        zip_code=90501,
        country='United State',
        categories='Thai',
        description='great Thai food',
        lat=33.831172,
        lng=-118.317328,

    )
    owner = User.query.get(1)
    owner.restaurants.append(restaurant_one)
    db.session.add(restaurant_one)
    
    db.session.commit()

def undo_restaurants():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.restaurants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM restaurants"))
        
    db.session.commit()
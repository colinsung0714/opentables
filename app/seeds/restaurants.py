from app.models import db, Restaurant, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_restaurants():
    restaurant_one = Restaurant(
        name='Khun 9 Thai Kitchen',
        restaurant_pic='https://opentables.s3.us-west-1.amazonaws.com/restaurantsample.jpg',
        phone='310-328-4888',
        street='2018 W Carson St',
        city='Torrance',
        state='CA',
        zip_code=90501,
        country='United State',
        avg_price=2,
        categories='Thai',
        description='great Thai food',
        lat=33.831172,
        lng=-118.317328,
    )
    restaurant_two = Restaurant(
        name='Amazon Go',
        restaurant_pic='https://opentables.s3.us-west-1.amazonaws.com/samplerestaurnt2.jpg',
        phone='888-280-4331',
        street='22135 Hawthorne Blvd',
        city='Torrance',
        state='CA',
        zip_code=90503,
        country='United State',
        avg_price=1,
        categories='Salad',
        description='Amazon Go is a new kind of store with no checkouts, powered by Just Walk Out Technology. Swing by to grab delicious made-to-order and ready-made foods, beverages, snacks, and more at a great value - then skip the checkout and get back to your day. Enjoy freshly brewed hot & iced coffees, espresso, beer & wine, kombucha & cold brew on tap, frozen yogurt, and so much more. Plus, you can quickly drop off Amazon online returns and browse a selection of everyday essentials. Simply use your Amazon app to enter the store, grab what you want, and go!',
        lat=33.8260963,
        lng=-118.3523585,
    )
    restaurant_three = Restaurant(
        name="Craig's",
        restaurant_pic='https://opentables.s3.us-west-1.amazonaws.com/samplerestaurant3.jpeg',
        phone='310-276-1900',
        street='8826 Melrose Ave',
        city='Los Angeles',
        state='CA',
        zip_code=90069,
        country='United State',
        avg_price=3,
        categories='Californian',
        description="Reservations accepted two weeks in advance. Serving American fare from upscale comfort food to vegan specialities in the heart of the West Hollywood Design district. Craig's offers covered and heating patio seating, indoor and bar seating. Reservations are recommended, but walk-ins accepted and our bar features our full dinner menu.",
        lat=34.0806198,
        lng=-118.3864144,
    )
    restaurant_four = Restaurant(
        name='1212 Santa Monica',
        restaurant_pic='https://opentables.s3.us-west-1.amazonaws.com/samplerestaurant4.jpg',
        phone='213-328-4888',
        street='1212 3rd Street Promenade',
        city='Santa Monica',
        state='CA',
        zip_code=90401,
        country='United State',
        avg_price=4,
        categories='Californian',
        description='1212 Santa Monica is a unique New American Cuisine restaurant located in the heart of Downtown Santa Monica on the Third Street Promenade',
        lat=34.0179497,
        lng=-118.4993061,
    )
    restaurant_five = Restaurant(
        name='Hello Fish',
        restaurant_pic='https://opentables.s3.us-west-1.amazonaws.com/samplerestaurant5.jpg',
        phone='213-123-4888',
        street='414 S Western Ave B',
        city='Los Angeles',
        state='CA',
        zip_code=90020,
        country='United State',
        avg_price=3,
        categories='Sushi',
        description='*Please leave a phone number when making a reservation.',
        lat=34.066667,
        lng=-118.3088658,
    )
    owner = User.query.get(1)
    owner2 = User.query.get(2)
    owner3 = User.query.get(3)
    owner.restaurants.append(restaurant_one)
    owner2.restaurants.append(restaurant_two)
    owner3.restaurants.append(restaurant_three)
    owner.restaurants.append(restaurant_four)
    owner.restaurants.append(restaurant_five)
    db.session.add(restaurant_one)
    db.session.add(restaurant_two)
    db.session.add(restaurant_three)
    db.session.add(restaurant_four)
    db.session.add(restaurant_five)
    
    db.session.commit()

def undo_restaurants():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.restaurants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM restaurants"))
        
    db.session.commit()
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
        description='Swing by to grab delicious made-to-order and ready-made foods, beverages, snacks, and more at a great value.',
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
        description="Reservations accepted two weeks in advance. Serving American fare from upscale comfort food to vegan specialities.",
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
    restaurant_six = Restaurant(
        name='Izakaya Hachi Torrance',
        restaurant_pic='https://opentables.s3.us-west-1.amazonaws.com/samplerestaurant6.jpg',
        phone='310-618-8357',
        street='1880A W.Carson',
        city='Carson',
        state='CA',
        zip_code=90501,
        country='United State',
        avg_price=4,
        categories='Japanese',
        description='Izakaya Hachi is an authentic Japanese restaurant serving Japanese tapas, Yakitori, fresh oysters, ShabuShabu, traditional Sushi, and a unique variety of Sake.',
        lat=33.830838,
        lng=-118.313906,
    )
    restaurant_seven = Restaurant(
        name='Solita Tacos & Margaritas - Long Beach',
        restaurant_pic='https://opentables.s3.us-west-1.amazonaws.com/samplerestaurant7.jpg',
        phone='562-357-6033',
        street='1 Pine Avenue',
        city='Long Beach',
        state='CA',
        zip_code=90802,
        country='United State',
        avg_price=2,
        categories='Mexican',
        description='Solita Tacos & Margaritas is about everything that makes us happy: great Mexican food, dynamite margaritas, and Southern California’s laid-back lifestyle.',
        lat=33.767383,
        lng=-118.192861,
    )
    restaurant_eight = Restaurant(
        name='North Italia - Del Amo',
        restaurant_pic='https://opentables.s3.us-west-1.amazonaws.com/samplerestaurant8.jpg',
        phone='310-342-2234',
        street='21532 Hawthorne Blvd',
        city='Torrance',
        state='CA',
        zip_code=90503,
        country='United State',
        avg_price=3,
        categories='Italian',
        description='At North, we focus on what we do best: Italian from scratch. Enjoy any of our handmade pastas and pizzas, created with seasonal ingredients and inventive flavors.',
        lat=33.833489,
        lng=-118.351243,
    )
    restaurant_nine = Restaurant(
        name='Hudson House',
        restaurant_pic='https://opentables.s3.us-west-1.amazonaws.com/samplerestaurant9.jpg',
        phone='323-310-4055',
        street='514 N Pacific Coast Hwy',
        city='Redondo Beach',
        state='CA',
        zip_code=90277,
        country='United State',
        avg_price=5,
        categories='American',
        description='Hudson House offers a large menu of beverages that features craft cocktails, wines, craft beers and a curated backbar that includes bourbon/rye, gin, tequila/mezcal and scotch.',
        lat=33.850263,
        lng=-118.388674,
    )
    restaurant_ten = Restaurant(
        name='pasjoli',
        restaurant_pic='https://opentables.s3.us-west-1.amazonaws.com/samplerestaurant10.jpg',
        phone='310-231-1952',
        street='2732 Main St',
        city='Santa Monica',
        state='CA',
        zip_code=90405,
        country='United State',
        avg_price=5,
        categories='French',
        description='We offer seating both indoors in our dining room and outdoors in our back (secret) garden, which you will choose when booking your reservation.',
        lat=34.000193,
        lng=-118.482091,
    )
    restaurant_eleven = Restaurant(
        name='The Arthur J',
        restaurant_pic='https://opentables.s3.us-west-1.amazonaws.com/samplerestaurant11.jpg',
        phone='310-878-9620',
        street='2732 Main St',
        city='Manhattan Beach',
        state='CA',
        zip_code=90266,
        country='United State',
        avg_price=5,
        categories='Steakhouse',
        description='When you combine our ability to source the best beef in the world, cooking with an incredible natural wood fire grill, and friendly thoughtful service, an incredible quality steak is born.',
        lat=33.882954,
        lng=-118.410035,
    )
    restaurant_twelve = Restaurant(
        name='Sur Le Vert Wine Bar',
        restaurant_pic='https://opentables.s3.us-west-1.amazonaws.com/samplerestaurant12.jpg',
        phone='310-231-7821',
        street='235 N Canon Dr',
        city='Beverly Hills',
        state='CA',
        zip_code=90210,
        country='United State',
        avg_price=5,
        categories='Wine Bar',
        description='Sur le Vert is a neighborhood wine bar in the heart of Beverly Hills, brought to you by the team behind Tabula Rasa in Los Feliz.',
        lat=34.06849,
        lng=-118.399264,
    )
    restaurant_thirteen = Restaurant(
        name='Umaya',
        restaurant_pic='https://opentables.s3.us-west-1.amazonaws.com/samplerestaurant13.jpg',
        phone='323-997-4349',
        street='3322 Wilshire Blvd',
        city='Los Angeles',
        state='CA',
        zip_code=90010,
        country='United State',
        avg_price=3,
        categories='Japanese',
        description='Serving Japanese cuisine in the heart of K-town! Enjoy high-scale dining with our renown kaiseki chef or enjoy our top of the class fresh fish at our sushi bar.',
        lat=34.061619,
        lng=-118.294964,
    )
    restaurant_fourteen = Restaurant(
        name='San Laurel',
        restaurant_pic='https://opentables.s3.us-west-1.amazonaws.com/samplerestaurant14.jpg',
        phone='313-123-4349',
        street='100 S Grand Ave',
        city='Los Angeles',
        state='CA',
        zip_code=90010,
        country='United State',
        avg_price=2,
        categories='Spanish',
        description='San Laurel is one of the flagship restaurants in Chef José Andrés’ collection at Conrad Los Angeles.',
        lat=34.055218,
        lng=-118.248701,
    )
    restaurant_fifteen = Restaurant(
        name="Ruth's Chris Steak House",
        restaurant_pic='https://opentables.s3.us-west-1.amazonaws.com/samplerestaurant15.jpg',
        phone='562-966-6777',
        street='180 E Ocean Blvd',
        city='Long Beach',
        state='CA',
        zip_code=90802,
        country='United State',
        avg_price=5,
        categories='Steakhouse',
        description="Ruth's Chris Steak House in Long Beach serves the finest USDA Prime beef available, broiled at 1,800° and served on 500° plates, so your steak stays hot, juicy and delicious from first bite to last.",
        lat=33.766546,
        lng=-118.191334,
    )
    owner = User.query.get(1)
    owner2 = User.query.get(2)
    owner3 = User.query.get(3)
    owner.restaurants.append(restaurant_one)
    owner2.restaurants.append(restaurant_two)
    owner3.restaurants.append(restaurant_three)
    owner.restaurants.append(restaurant_four)
    owner.restaurants.append(restaurant_five)
    owner2.restaurants.append(restaurant_six)
    owner.restaurants.append(restaurant_seven)
    owner2.restaurants.append(restaurant_eight)
    owner2.restaurants.append(restaurant_nine)
    owner2.restaurants.append(restaurant_ten)
    owner.restaurants.append(restaurant_eleven)
    owner.restaurants.append(restaurant_twelve)
    owner.restaurants.append(restaurant_thirteen)
    owner.restaurants.append(restaurant_fourteen)
    owner2.restaurants.append(restaurant_fifteen)
    db.session.add(restaurant_one)
    db.session.add(restaurant_two)
    db.session.add(restaurant_three)
    db.session.add(restaurant_four)
    db.session.add(restaurant_five)
    db.session.add(restaurant_six)
    db.session.add(restaurant_seven)
    db.session.add(restaurant_eight)
    db.session.add(restaurant_nine)
    db.session.add(restaurant_ten)
    db.session.add(restaurant_eleven)
    db.session.add(restaurant_twelve)
    db.session.add(restaurant_thirteen)
    db.session.add(restaurant_fourteen)
    db.session.add(restaurant_fifteen)
    db.session.commit()

def undo_restaurants():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.restaurants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM restaurants"))
        
    db.session.commit()
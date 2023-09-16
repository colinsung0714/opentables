from app.models import db, Restaurant, User, Restaurant_image, environment, SCHEMA
from sqlalchemy.sql import text


def seed_restaurant_images():
    restaurant = Restaurant.query.get(1)
    image1 = Restaurant_image(
        url = 'https://opentables.s3.us-west-1.amazonaws.com/restaurantsample.jpg'
    )
    image2 = Restaurant_image(
        url = 'https://opentables.s3.us-west-1.amazonaws.com/samplerestaurant3.jpeg'
    )
    image3 = Restaurant_image(
        url = 'https://opentables.s3.us-west-1.amazonaws.com/samplerestaurant4.jpg'
    )
    image4 = Restaurant_image(
        url = 'https://opentables.s3.us-west-1.amazonaws.com/samplerestaurnt2.jpg'
    )
    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    restaurant.restaurant_images.append(image1)
    restaurant.restaurant_images.append(image2)
    restaurant.restaurant_images.append(image3)
    restaurant.restaurant_images.append(image4)
    db.session.commit()

def undo_restaurant_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.restaurant_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM restaurant_images"))
        
    db.session.commit()
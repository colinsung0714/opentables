from app.models import db, Review, User, Review_image, environment, SCHEMA
from sqlalchemy.sql import text


def seed_review_images():
    review = Review.query.get(1)
    image1 = Review_image(
        url = 'https://opentables.s3.us-west-1.amazonaws.com/samplefood1.jpg'
    )
    image2 = Review_image(
        url = 'https://opentables.s3.us-west-1.amazonaws.com/samplefood2.jpg'
    )
    image3 = Review_image(
        url = 'https://opentables.s3.us-west-1.amazonaws.com/samplefood3.jpg'
    )
    image4 = Review_image(
        url = 'https://opentables.s3.us-west-1.amazonaws.com/samplefood4.jpg'
    )
    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    review.review_images.append(image1)
    review.review_images.append(image2)
    review.review_images.append(image3)
    review.review_images.append(image4)
    db.session.commit()

def undo_review_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.review_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM review_images"))
        
    db.session.commit()
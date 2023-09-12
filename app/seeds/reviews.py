from app.models import db, Restaurant, User, Reservation, Review,environment, SCHEMA
from sqlalchemy.sql import text
from app.api.helper import calculate_avg

def seed_reviews():
    review_one = Review(
        rating=1,
        comment='Super nice restaurant',
    )
    review_two = Review(
        rating=2,
        comment='Super nice restaurant',
    )
    db.session.add(review_one)
    db.session.add(review_two)
    user_one = User.query.get(1)
    restaurant_one = Restaurant.query.get(1)
    user_one.reviews.append(review_one)
    restaurant_one.reviews.append(review_one)
    user_one.reviews.append(review_two)
    restaurant_one.reviews.append(review_two)
    restaurant_one.avg_rating = calculate_avg(restaurant_one)
    db.session.commit()
    
    


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
        
    db.session.commit()
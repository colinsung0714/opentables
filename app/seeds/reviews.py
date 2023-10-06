from app.models import db, Restaurant, User, Reservation, Review,environment, SCHEMA
from sqlalchemy.sql import text
from app.api.helper import calculate_avg, total_review_num

def seed_reviews():
    review_one = Review(
        rating=5,
        comment='Super nice restaurant!',
    )
    review_two = Review(
        rating=3,
        comment='Good, but noisy.',
    )
    review_three = Review(
        rating=4,
        comment='Food was great! I would recommend family and friends to go.',
    )
    review_four = Review(
        rating=5,
        comment='Ambiance was great! That view was so good. Highly recommend.',
    )
    review_five = Review(
        rating=1,
        comment='This restaurant is too busy to care about customer service anymore.',
    )
    review_six = Review(
        rating=3,
        comment="This place seems to be very popular and the ambiance is really nice and perfect for a beachside meal, but I'd say the food is okay and overpriced.",
    )
    review_seven = Review(
        rating=2,
        comment='Food was fantastic but the servers were very not nice.',
    )
    review_eight = Review(
        rating=4,
        comment='You will love the relaxing energy and vibe of the restaurant, but I suggest booking advanced reservation.',
    )
    review_nine = Review(
        rating=1,
        comment='Very disappointed.',
    )
    review_ten = Review(
        rating=1,
        comment='Very disappointed.',
    )
    review_eleven = Review(
        rating=5,
        comment='This place was amazing with their food and the vibes.',
    )
    review_twelve = Review(
        rating=4,
        comment='Everything was perfect except parking situation.',
    )
    review_thirteen = Review(
        rating=3,
        comment='I liked their customer service.',
    )
    review_fourteen = Review(
        rating=5,
        comment='The best restaurant ever!',
    )
    review_fifteen = Review(
        rating=2,
        comment='Food was overpriced.',
    )
        

    db.session.add(review_one)
    db.session.add(review_two)
    db.session.add(review_three)
    db.session.add(review_four)
    db.session.add(review_five)
    db.session.add(review_six)
    db.session.add(review_seven)
    db.session.add(review_eight)
    db.session.add(review_nine)
    db.session.add(review_ten)
    db.session.add(review_eleven)
    db.session.add(review_twelve)
    db.session.add(review_thirteen)
    db.session.add(review_fourteen)
    db.session.add(review_fifteen)
    user_one = User.query.get(1)
    user_two = User.query.get(2)
    user_three = User.query.get(3)
    user_four = User.query.get(4)
    user_five = User.query.get(5)
    user_six = User.query.get(6)
    restaurant_one = Restaurant.query.get(1)
    restaurant_two = Restaurant.query.get(2)
    restaurant_three = Restaurant.query.get(3)
    restaurant_four = Restaurant.query.get(4)
    restaurant_five = Restaurant.query.get(5)
    restaurant_six = Restaurant.query.get(6)
    restaurant_seven = Restaurant.query.get(7)
    restaurant_eight = Restaurant.query.get(8)
    restaurant_nine = Restaurant.query.get(9)
    restaurant_ten = Restaurant.query.get(10)
    restaurant_eleven = Restaurant.query.get(11)
    restaurant_twelve = Restaurant.query.get(12)
    restaurant_thirteen = Restaurant.query.get(13)
    restaurant_fourteen = Restaurant.query.get(14)
    user_one.reviews.append(review_one)
    restaurant_one.reviews.append(review_one)
    user_two.reviews.append(review_two)
    restaurant_one.reviews.append(review_two)
    user_three.reviews.append(review_three)
    restaurant_two.reviews.append(review_three)
    user_four.reviews.append(review_four)
    restaurant_three.reviews.append(review_four)
    user_five.reviews.append(review_five)
    restaurant_five.reviews.append(review_five)
    user_six.reviews.append(review_six)
    restaurant_four.reviews.append(review_six)
    user_five.reviews.append(review_seven)
    restaurant_six.reviews.append(review_seven)
    user_five.reviews.append(review_eight)
    restaurant_seven.reviews.append(review_eight)
    user_five.reviews.append(review_nine)
    restaurant_eight.reviews.append(review_nine)
    user_five.reviews.append(review_ten)
    restaurant_nine.reviews.append(review_ten)
    user_five.reviews.append(review_eleven)
    restaurant_ten.reviews.append(review_eleven)
    user_five.reviews.append(review_twelve)
    restaurant_eleven.reviews.append(review_twelve)
    user_five.reviews.append(review_thirteen)
    restaurant_twelve.reviews.append(review_thirteen)
    user_five.reviews.append(review_fourteen)
    restaurant_thirteen.reviews.append(review_fourteen)
    user_five.reviews.append(review_fifteen)
    restaurant_fourteen.reviews.append(review_fifteen)
    restaurant_one.avg_rating = calculate_avg(restaurant_one)
    restaurant_one.review_num = total_review_num(restaurant_one)
    restaurant_two.avg_rating = calculate_avg(restaurant_two)
    restaurant_two.review_num = total_review_num(restaurant_two)
    restaurant_three.avg_rating = calculate_avg(restaurant_three)
    restaurant_three.review_num = total_review_num(restaurant_three)
    restaurant_four.avg_rating = calculate_avg(restaurant_four)
    restaurant_four.review_num = total_review_num(restaurant_four)
    restaurant_five.avg_rating = calculate_avg(restaurant_five)
    restaurant_five.review_num = total_review_num(restaurant_five)
    restaurant_six.avg_rating = calculate_avg(restaurant_six)
    restaurant_six.review_num = total_review_num(restaurant_six)
    restaurant_seven.avg_rating = calculate_avg(restaurant_seven)
    restaurant_seven.review_num = total_review_num(restaurant_seven)
    restaurant_eight.avg_rating = calculate_avg(restaurant_eight)
    restaurant_eight.review_num = total_review_num(restaurant_eight)
    restaurant_nine.avg_rating = calculate_avg(restaurant_nine)
    restaurant_nine.review_num = total_review_num(restaurant_nine)
    restaurant_ten.avg_rating = calculate_avg(restaurant_ten)
    restaurant_ten.review_num = total_review_num(restaurant_ten)
    restaurant_eleven.avg_rating = calculate_avg(restaurant_eleven)
    restaurant_eleven.review_num = total_review_num(restaurant_eleven)
    restaurant_twelve.avg_rating = calculate_avg(restaurant_twelve)
    restaurant_twelve.review_num = total_review_num(restaurant_twelve)
    restaurant_thirteen.avg_rating = calculate_avg(restaurant_thirteen)
    restaurant_thirteen.review_num = total_review_num(restaurant_thirteen)
    restaurant_fourteen.avg_rating = calculate_avg(restaurant_fourteen)
    restaurant_fourteen.review_num = total_review_num(restaurant_fourteen)
    db.session.commit()
    
    


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
        
    db.session.commit()
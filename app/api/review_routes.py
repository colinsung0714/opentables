from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import db
from ..models.review import Review
from ..models.restaurant import Restaurant
from ..models.user import User
from ..models.review_image import Review_image
from ..forms.new_review_form import NewReviewForm
from app.api.helper import calculate_avg, total_review_num
from app.api.AWS_helpers import upload_file_to_s3, get_unique_filename
review_routes = Blueprint('review', __name__)

@review_routes.route('/restaurants/<int:restaurantId>')
def restaurant_reviews(restaurantId):
    reviews = Review.query.filter(Review.restaurant_id == restaurantId).all()
 
    return {"reviews" : [review.to_dict() for review in reviews]}

@review_routes.route('/restaurants/<int:restaurantId>/user/<int:userId>', methods=['POST'])
@login_required
def add_review(restaurantId, userId):
    form = NewReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    restaurant = Restaurant.query.get(restaurantId)
    user = User.query.get(userId)
    
    if form.validate_on_submit():
        uploaded_files = request.files.getlist('review_images')
        new_review = Review(
            rating=form.data['rating'],
            comment =form.data['comment']
        )
        if len(uploaded_files):
            for file in uploaded_files:
                review_image = file
                review_image.filename = get_unique_filename(review_image.filename)
                upload = upload_file_to_s3(review_image)
                new_review_image = Review_image( url = upload['url'])
                db.session.add(new_review_image)
                new_review.review_images.append(new_review_image)
                
        db.session.add(new_review)
        restaurant.reviews.append(new_review)
        user.reviews.append(new_review)
        restaurant.avg_rating = calculate_avg(restaurant)
        restaurant.review_num = total_review_num(restaurant)
        db.session.commit()
        return new_review.to_dict()
    
@review_routes.route('/<int:reviewId>/edit', methods=['PUT'])
@login_required
def edit_review(reviewId):
    form = NewReviewForm()
    
    form['csrf_token'].data = request.cookies['csrf_token']
    review = Review.query.get(reviewId)
    if form.validate_on_submit():
        restaurant = Restaurant.query.get(form.data['restaurant_id'])
        uploaded_files = request.files.getlist('review_images')
        if len(uploaded_files):
            prev_images= Review_image.query.filter(Review_image.review_id == reviewId).all()
            review.review_images = []
            _ = [db.session.delete(prev_img) for prev_img in prev_images]
            for file in uploaded_files:
                review_image = file
                review_image.filename = get_unique_filename(review_image.filename)
                upload = upload_file_to_s3(review_image)
                new_review_image = Review_image( url = upload['url'])
                db.session.add(new_review_image)
                review.review_images.append(new_review_image)
            
        review.comment = form.data['comment']
        review.rating = form.data['rating']
        restaurant.avg_rating = calculate_avg(restaurant)
        db.session.commit()
        return review.to_dict()
    
@review_routes.route('/<int:reviewId>/restaurant/<int:restaurantId>/delete', methods=['DELETE'])
@login_required
def delete_review(reviewId, restaurantId):
    review = Review.query.get(reviewId)
    res = review.to_dict()
    restaurant = Restaurant.query.get(restaurantId)
    db.session.delete(review)
    restaurant.avg_rating = calculate_avg(restaurant)
    restaurant.review_num = total_review_num(restaurant)
    db.session.commit()
    return res
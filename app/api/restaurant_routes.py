from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from ..models.restaurant import Restaurant
from ..models.user import User
from ..models.business_hour import Business_hour
from app.models import db
from app.forms import NewRestaurantForm
from datetime import time
from sqlalchemy import select
from sqlalchemy.orm import joinedload
from app.api.AWS_helpers import upload_file_to_s3, get_unique_filename
restaurant_routes = Blueprint('restaurant', __name__)

@restaurant_routes.route('/all')
def all_restaurants():
    restaurants = Restaurant.query.options(joinedload(Restaurant.business_hours)).all()
    
    res = [restaurant.to_dict() for restaurant in restaurants]
    return { 'restaurants' : res}

@restaurant_routes.route('/<int:restaurantId>')
def single_restaurant(restaurantId):
   
    restaurant = Restaurant.query.get(restaurantId)
    return restaurant.to_dict()

@restaurant_routes.route('/new/<int:userId>', methods=['POST'])
@login_required
def new_restaurant(userId):
    form = NewRestaurantForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        if form.data['restaurant_pic']:
            restaurant_pic = form.data['restaurant_pic']
            restaurant_pic.filename = get_unique_filename(restaurant_pic.filename)
            upload = upload_file_to_s3(restaurant_pic)
        else:
            upload = {}
            upload['url'] = 'https://opentables.s3.us-west-1.amazonaws.com/default_restaurant.jpg'
            
        owner = User.query.get(userId)
        restaurant = Restaurant(
            name=form.data['name'],
            restaurant_pic = upload['url'],
            phone = form.data['phone'],
            street = form.data['street'],
            city= form.data['city'],
            state=form.data['state'],
            zip_code=form.data['zip_code'],
            country = form.data['country'],
            categories = form.data['categories'],
            description = form.data['description'],
            avg_price = form.data['avg_price']
        )
        owner.restaurants.append(restaurant)
        if form.data['monday_open']:
            start_hour, start_min = form.data['monday_open'].split(':')
            end_hour, end_min = form.data['monday_close'].split(':')
            monday_hours = Business_hour(
                day='Monday',
                start=time(int(start_hour), int(start_min)),
                end= time(int(end_hour), int(end_min))
            )
            restaurant.business_hours.append(monday_hours)
            db.session.add(monday_hours)
        if form.data['tuesday_open']:
            start_hour, start_min = form.data['tuesday_open'].split(':')
            end_hour, end_min = form.data['tuesday_close'].split(':')
            tuesday_hours = Business_hour(
                day='Tuesday',
                start=time(int(start_hour), int(start_min)),
                end= time(int(end_hour), int(end_min))
            )
            restaurant.business_hours.append(tuesday_hours)
            db.session.add(tuesday_hours)
        if form.data['wednesday_open']:
           
            start_hour, start_min = form.data['wednesday_open'].split(':')
            end_hour, end_min = form.data['wednesday_close'].split(':')
            wednesday_hours = Business_hour(
                day='Wednesday',
                start=time(int(start_hour), int(start_min)),
                end= time(int(end_hour), int(end_min))
            )
            restaurant.business_hours.append(wednesday_hours)
            db.session.add(wednesday_hours)
        if form.data['thursday_open']:
           
            start_hour, start_min = form.data['thursday_open'].split(':')
            end_hour, end_min = form.data['thursday_close'].split(':')
            thursday_hours = Business_hour(
                day='Thursday',
                start=time(int(start_hour), int(start_min)),
                end= time(int(end_hour), int(end_min))
            )
            restaurant.business_hours.append(thursday_hours)
            db.session.add(thursday_hours)
        if form.data['friday_open']:
           
            start_hour, start_min = form.data['friday_open'].split(':')
            end_hour, end_min = form.data['friday_close'].split(':')
            friday_hours = Business_hour(
                day='Friday',
                start=time(int(start_hour), int(start_min)),
                end= time(int(end_hour), int(end_min))
            )
            restaurant.business_hours.append(friday_hours)
            db.session.add(friday_hours)
        if form.data['saturday_open']:
           
            start_hour, start_min = form.data['saturday_open'].split(':')
            end_hour, end_min = form.data['saturday_close'].split(':')
            saturday_hours = Business_hour(
                day='Saturday',
                start=time(int(start_hour), int(start_min)),
                end= time(int(end_hour), int(end_min))
            )
            restaurant.business_hours.append(saturday_hours)
            db.session.add(saturday_hours)
        if form.data['sunday_open']:
           
            start_hour, start_min = form.data['sunday_open'].split(':')
            end_hour, end_min = form.data['sunday_close'].split(':')
            sunday_hours = Business_hour(
                day='Sunday',
                start=time(int(start_hour), int(start_min)),
                end= time(int(end_hour), int(end_min))
            )
            restaurant.business_hours.append(sunday_hours)
            db.session.add(sunday_hours)
        db.session.commit()

        return restaurant.to_dict()

@restaurant_routes.route('/<int:restaurantId>/edit', methods=['PUT'])
@login_required
def update_restaurant(restaurantId):
    form = NewRestaurantForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    restaurant = Restaurant.query.get(restaurantId)
    if form.validate_on_submit():
      
        if form.data['restaurant_pic']:
            restaurant_pic = form.data['restaurant_pic']
            restaurant_pic.filename = get_unique_filename(restaurant_pic.filename)
            upload = upload_file_to_s3(restaurant_pic)
            if 'url' not in upload:
                print(upload)
            restaurant.restaurant_pic = upload['url']
      
        restaurant.name=form.data['name']
        restaurant.phone = form.data['phone']
        restaurant.street = form.data['street']
        restaurant.city= form.data['city']
        restaurant.state=form.data['state']
        restaurant.zip_code=form.data['zip_code']
        restaurant.country = form.data['country']
        restaurant.categories = form.data['categories']
        restaurant.description = form.data['description']
        restaurant.avg_price = form.data['avg_price']
        
        restaurant.business_hours= []
        if form.data['monday_open']:
            start_hour, start_min = form.data['monday_open'].split(':')
            end_hour, end_min = form.data['monday_close'].split(':')
            monday_hours = Business_hour(
                day='Monday',
                start=time(int(start_hour), int(start_min)),
                end= time(int(end_hour), int(end_min))
            )
            restaurant.business_hours.append(monday_hours)
            db.session.add(monday_hours)
        if form.data['tuesday_open']:
            start_hour, start_min = form.data['tuesday_open'].split(':')
            end_hour, end_min = form.data['tuesday_close'].split(':')
            tuesday_hours = Business_hour(
                day='Tuesday',
                start=time(int(start_hour), int(start_min)),
                end= time(int(end_hour), int(end_min))
            )
            restaurant.business_hours.append(tuesday_hours)
            db.session.add(tuesday_hours)
        if form.data['wednesday_open']:
           
            start_hour, start_min = form.data['wednesday_open'].split(':')
            end_hour, end_min = form.data['wednesday_close'].split(':')
            wednesday_hours = Business_hour(
                day='Wednesday',
                start=time(int(start_hour), int(start_min)),
                end= time(int(end_hour), int(end_min))
            )
            restaurant.business_hours.append(wednesday_hours)
            db.session.add(wednesday_hours)
        if form.data['thursday_open']:
           
            start_hour, start_min = form.data['thursday_open'].split(':')
            end_hour, end_min = form.data['thursday_close'].split(':')
            thursday_hours = Business_hour(
                day='Thursday',
                start=time(int(start_hour), int(start_min)),
                end= time(int(end_hour), int(end_min))
            )
            restaurant.business_hours.append(thursday_hours)
            db.session.add(thursday_hours)
        if form.data['friday_open']:
           
            start_hour, start_min = form.data['friday_open'].split(':')
            end_hour, end_min = form.data['friday_close'].split(':')
            friday_hours = Business_hour(
                day='Friday',
                start=time(int(start_hour), int(start_min)),
                end= time(int(end_hour), int(end_min))
            )
            restaurant.business_hours.append(friday_hours)
            db.session.add(friday_hours)
        if form.data['saturday_open']:
           
            start_hour, start_min = form.data['saturday_open'].split(':')
            end_hour, end_min = form.data['saturday_close'].split(':')
            saturday_hours = Business_hour(
                day='Saturday',
                start=time(int(start_hour), int(start_min)),
                end= time(int(end_hour), int(end_min))
            )
            restaurant.business_hours.append(saturday_hours)
            db.session.add(saturday_hours)
        if form.data['sunday_open']:
           
            start_hour, start_min = form.data['sunday_open'].split(':')
            end_hour, end_min = form.data['sunday_close'].split(':')
            sunday_hours = Business_hour(
                day='Sunday',
                start=time(int(start_hour), int(start_min)),
                end= time(int(end_hour), int(end_min))
            )
            restaurant.business_hours.append(sunday_hours)
            db.session.add(sunday_hours)
        db.session.commit()

        return restaurant.to_dict()
        
@restaurant_routes.route('/<int:restaurantId>/delete', methods=['DELETE'])
@login_required
def delete_restaurant(restaurantId):
    target_restaurant = Restaurant.query.get(restaurantId)
    db.session.delete(target_restaurant)
    db.session.commit()
    return target_restaurant.to_dict()
    
        

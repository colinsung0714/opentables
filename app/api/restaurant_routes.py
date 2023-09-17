from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from ..models.restaurant import Restaurant
from ..models.user import User
from ..models.business_hour import Business_hour
from ..models.restaurant_image import Restaurant_image
from ..models.menu import Menu, MenuItem
from app.models import db
from app.forms import NewRestaurantForm
from datetime import time, datetime
from sqlalchemy import select, or_
from sqlalchemy.orm import joinedload
from app.api.AWS_helpers import upload_file_to_s3, get_unique_filename
import googlemaps
import os

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
        uploaded_files = request.files.getlist('restaurant_pic')
        image_list = []
        if len(uploaded_files):
            for index in range(len(uploaded_files)):
                file = uploaded_files[index]
                if index == 0 :
                    restaurant_pic = file
                    restaurant_pic.filename = get_unique_filename(restaurant_pic.filename)
                    upload = upload_file_to_s3(restaurant_pic)
                    first_image = Restaurant_image(
                        url = upload['url']
                    )
                    image_list.append(first_image)
                    db.session.add(first_image)
                else:
                    other_pic = file
                    other_pic.filename = get_unique_filename(other_pic.filename)
                    other_upload = upload_file_to_s3(other_pic)
                    other_image = Restaurant_image(
                        url = other_upload['url']
                    )
                    image_list.append(other_image)
                    db.session.add(other_image)
        
        else:
            upload = {}
            upload['url'] = 'https://opentables.s3.us-west-1.amazonaws.com/default_restaurant.jpg'
        api_key = os.environ.get('MAPS_API_KEY')
        gmaps = googlemaps.Client(key=api_key)
        street = form.data['state']
        state= form.data['state']
        city = form.data['city']

        
        try:
            geocode_result = gmaps.geocode(f'{street}, {city}, {state}')
            lat, lng = geocode_result[0]['geometry']['location'].values()
        
        except IndexError as e:
            return {'error':'Please provide address correctly'}, 400
        
        owner = User.query.get(userId)
        restaurant = Restaurant(
            name=form.data['name'],
            restaurant_pic = upload['url'],
            phone = form.data['phone'],
            street = street,
            city= city,
            state=state,
            lat=float(lat),
            lng=float(lng),
            zip_code=form.data['zip_code'],
            country = form.data['country'],
            categories = form.data['categories'],
            description = form.data['description'],
            avg_price = form.data['avg_price']
        )
        if len(image_list):
            _ =  [ restaurant.restaurant_images.append(image) for image in image_list ]
            
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
        uploaded_files = request.files.getlist('restaurant_pic')
        if len(uploaded_files):
            restaurant.restaurant_images = []
            restaurant_images = Restaurant_image.query.filter(Restaurant_image.restaurant_id == restaurantId).all()
            _ = [db.session.delete(restaurant_image) for restaurant_image in restaurant_images]
            for index in range(len(uploaded_files)):
                file = uploaded_files[index]
                if index == 0 :
                    restaurant_pic = file
                    restaurant_pic.filename = get_unique_filename(restaurant_pic.filename)
                    upload = upload_file_to_s3(restaurant_pic)
                    first_image = Restaurant_image(
                        url = upload['url']
                    )
                    restaurant.restaurant_pic = upload['url']
                    db.session.add(first_image)
                    restaurant.restaurant_images.append(first_image)
                else:
                    other_pic = file
                    other_pic.filename = get_unique_filename(other_pic.filename)
                    other_upload = upload_file_to_s3(other_pic)
                    other_image = Restaurant_image(
                        url = other_upload['url']
                    )
                    restaurant.restaurant_images.append(other_image)
                    db.session.add(other_image)
      
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

@restaurant_routes.route('/search', methods=['POST'])
def search_restaurant():
    data = request.json
    year, month, day, hour, min = data['date_time'].split(':')
    reservation_date = datetime(int(year), int(month), int(day), int(hour), int(min))
    target_time = time(int(hour), int(min))
    target_day = reservation_date.strftime('%A')
    if data['name']:
        restaurants = Restaurant.query.options(joinedload(Restaurant.menus).options(joinedload(Menu.menu_items))).filter(or_(Restaurant.name.ilike(f"%{data['name']}%"), Restaurant.categories.ilike(f"%{data['name']}%"), MenuItem.name.ilike(f"%{data['name']}%"))).all()
        if restaurants:
            avaliable_restaurant = []
            for restaurant in restaurants:
                if target_day in [bsh.day.name for bsh in restaurant.business_hours] and len([bsh for bsh in restaurant.business_hours if bsh.start <= target_time <= bsh.end]):
                    avaliable_restaurant.append(restaurant)
            if not len(avaliable_restaurant):
                return {'error': "There is no match restaurant"}   
    
            no_available_restaurants = []
            for restaurant in avaliable_restaurant:
                if  reservation_date in [reserv.reservation_date for reserv in restaurant.reservations]:
                    no_available_restaurants.append(restaurant)
            if len(no_available_restaurants):
                for restaurant in no_available_restaurants:
                    if restaurant in avaliable_restaurant:
                        avaliable_restaurant.remove(restaurant)
            return {'restaurants' : [restaurant.to_dict() for restaurant in avaliable_restaurant]}
        else:
            return {'error': "There is no match restaurant"}           

    else:
        restaurants = Restaurant.query.all()
        if restaurants:
            avaliable_restaurant = []
            for restaurant in restaurants:
                if target_day in [bsh.day.name for bsh in restaurant.business_hours] and len([bsh for bsh in restaurant.business_hours if bsh.start <= target_time <= bsh.end]):
                    avaliable_restaurant.append(restaurant)
            if not len(avaliable_restaurant):
                return {'error': "There is no match restaurant"}   
    
            no_available_restaurants = []
            for restaurant in avaliable_restaurant:
                if  reservation_date in [reserv.reservation_date for reserv in restaurant.reservations]:
                    no_available_restaurants.append(restaurant)
            if len(no_available_restaurants):
                for restaurant in no_available_restaurants:
                    if restaurant in avaliable_restaurant:
                        avaliable_restaurant.remove(restaurant)
            return {'restaurants' : [restaurant.to_dict() for restaurant in avaliable_restaurant]}
        else:
            return {'error': "There is no match restaurant"}  
                    
       
      


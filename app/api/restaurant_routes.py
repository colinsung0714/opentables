from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from ..models.restaurant import Restaurant
restaurant_routes = Blueprint('restaurant', __name__)

@restaurant_routes.route('/all')
def all_restaurants():
    restaurants = Restaurant.query.all()
    return { 'restaurants' : [restaurant.to_dict() for restaurant in restaurants]}

@restaurant_routes.route('/restaurants/<int:restaurantId>')
def single_restaurant(restaurantId):
    restaurant = Restaurant.query.get(restaurantId)
    return restaurant.to_dict()
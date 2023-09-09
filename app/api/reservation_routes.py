from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import db
from datetime import datetime
from sqlalchemy import select
from sqlalchemy.orm import joinedload
from app.forms import NewReservationForm
from app.models import Reservation, Restaurant, User

reservation_routes = Blueprint('reservation', __name__)

@reservation_routes.route('/users/<int:userId>/all')
@login_required
def all_reservations(userId):

    reservations = Reservation.query.filter(Reservation.user_id == userId).all()

    res = [reservation.to_dict() for reservation in reservations]
    return { 'reservations': res }

@reservation_routes.route('/restaurants/<int:restaurantId>/all')
@login_required
def all_restaurant_reservations(restaurantId):

    reservations = Reservation.query.filter(Reservation.restaurant_id == restaurantId).all()

    res = [reservation.to_dict() for reservation in reservations]
    return { 'reservations': res }

@reservation_routes.route('/user/<int:userId>/restaurants/<int:restaurantId>/new', methods=['POST'])
@login_required
def new_reservation(userId, restaurantId):
   
    form = NewReservationForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        year, month, day, hour, min = form.data['reservation_date'].split(':')
        reservation = Reservation(
            party=form.data['party'],
            reservation_date=datetime(int(year), int(month), int(day), int(hour), int(min))
        )
        db.session.add(reservation)
        restaurant = Restaurant.query.get(restaurantId)
        user = User.query.get(userId)
        user.reservations.append(reservation)
        restaurant.reservations.append(reservation)

        db.session.commit()
        return reservation.to_dict()
    
@reservation_routes.route('/<int:reservationId>/edit', methods=['PUT'])
@login_required
def update_reservation(reservationId):
    form = NewReservationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    reservation = Reservation.query.get(reservationId)
    
    if form.validate_on_submit():
        
        year, month, day, hour, min = form.data['reservation_date'].split(':')
        reservation.reservation_date = datetime(int(year), int(month), int(day), int(hour), int(min))
        reservation.party = form.data['party']

        db.session.commit()
        return reservation.to_dict()
    
@reservation_routes.route('/<int:reservationId>/delete', methods=['DELETE'])
@login_required
def delete_reservation(reservationId):
    print('~~~~~~~~~~~~~~~reservationId', reservationId)
    reservation = Reservation.query.get(reservationId)
    res = reservation.to_dict()
    print('~~~~~~~~~~~~~~~~reservation', reservation)
    user = User.query.get(reservation.user_id)
    restaurant = Restaurant.query.get(reservation.restaurant_id)
    print('~~~~~~~~~~~~~~~~~~~~~user', user.reservations)
    print('~~~~~~~~~~~~~~~~~~~~~restaurant', restaurant.reservations)
    user.reservations.remove(reservation)
    restaurant.reservations.remove(reservation)
    db.session.delete(reservation)
    db.session.commit()
    return res
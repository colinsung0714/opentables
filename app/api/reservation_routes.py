from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import db
from datetime import datetime
from sqlalchemy import select
from sqlalchemy.orm import joinedload
from app.forms import NewReservationForm
from app.models import Reservation, Restaurant, User
from sqlalchemy.exc import IntegrityError

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
    try:
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
    except ValueError as e:
        db.session.rollback()
        error_message = "Please select another time."
        return jsonify({'error': error_message}), 400
    
@reservation_routes.route('/<int:reservationId>/edit', methods=['PUT'])
@login_required
def update_reservation(reservationId):
    form = NewReservationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    reservation = Reservation.query.get(reservationId)
    restaurant = Restaurant.query.get(reservation.restaurant_id)
    try:
        if form.validate_on_submit():
            year, month, day, hour, min = form.data['reservation_date'].split(':')
           
            date = datetime(int(year), int(month), int(day)).strftime('%A')
            days_bs_hour = [bs_hour.day.name for bs_hour in restaurant.business_hours]
            if date not in days_bs_hour:
                db.session.rollback()
                error_message = "Restaurant close that day, please choose another day."
                return jsonify({'error': error_message}), 400
            reservation.reservation_date = datetime(int(year), int(month), int(day), int(hour), int(min))
            reservation.party = form.data['party']

            db.session.commit()
            return reservation.to_dict()
    except IntegrityError as e:
        db.session.rollback()
        error_message = "A reservation with that time already exists."
        return jsonify({'error': error_message}), 400
@reservation_routes.route('/<int:reservationId>/delete', methods=['DELETE'])
@login_required
def delete_reservation(reservationId):
   
    reservation = Reservation.query.get(reservationId)
    res = reservation.to_dict()    
    db.session.delete(reservation)
    db.session.commit()
    return res

@reservation_routes.route('/all')
def all_reservations_landing():
    reservations = Reservation.query.all()
    return  { 'reservations': [reservation.to_dict() for reservation in reservations] }
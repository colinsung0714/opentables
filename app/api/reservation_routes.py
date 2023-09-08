from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import db
from datetime import datetime
from sqlalchemy import select
from sqlalchemy.orm import joinedload
from ..models.reservation import Reservation

reservation_routes = Blueprint('reservation', __name__)

@reservation_routes.route('/users/<int:userId>/all')
def all_reservations(userId):

    reservations = Reservation.query.filter(Reservation.user_id == userId).all()

    res = [reservation.to_dict() for reservation in reservations]
    return { 'reservations': res }
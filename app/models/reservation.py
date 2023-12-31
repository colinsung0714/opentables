from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import UniqueConstraint
from datetime import datetime

class Reservation(db.Model):
    __tablename__ = 'reservations'

    __table_args__ = (
        UniqueConstraint('restaurant_id', 'reservation_date', name='unique_combination_constraint'),
        {'schema': SCHEMA} if environment == "production" else None,
    )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('restaurants.id')))
    party = db.Column(db.Integer, default=2)
    reservation_date = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    restaurant = db.relationship('Restaurant', back_populates='reservations')
    user = db.relationship('User', back_populates='reservations')

    def to_dict(self):
        return {
            'id': self.id,
            'restaurantId': self.restaurant_id,
            'userId': self.user_id,
            'reservationDate': self.reservation_date.strftime("%Y-%m-%d %H:%M"),
            'numGuests': self.party,
            'restaurantInfo': self.restaurant.to_dict(),
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
    
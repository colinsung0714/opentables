from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import UniqueConstraint
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    __table_args__ = (
        UniqueConstraint('user_id', 'restaurant_id', name='unique_combination_user_restaurant'),
        {'schema': SCHEMA} if environment == "production" else None,
    )

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('restaurants.id')))
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    user = db.relationship('User', back_populates='reviews')
    restaurant = db.relationship('Restaurant', back_populates='reviews')
    review_images =db.relationship('Review_image', back_populates='review')
    
    def to_dict(self):
        return {
            'id':self.id,
            'userId':self.user_id,
            'restaurantId':self.restaurant_id,
            'rating':self.rating,
            'comment':self.comment,
            'createAt':self.created_at,
            'updated_at':self.updated_at,
            'user':self.user.to_dict() if self.user else None,
            'reviewImages': [review_image.to_dict() for review_image in self.review_images]
        }
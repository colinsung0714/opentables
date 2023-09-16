from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Restaurant_image(db.Model):
    __tablename__ = 'restaurant_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(255), nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('restaurants.id')))
  
    
    restaurant = db.relationship('Restaurant', back_populates='restaurant_images')
   
    def to_dict(self):
        return {
            'id': self.id,
            'restaurantId': self.restaurant_id,
            'url':self.url
        }
    

 

    


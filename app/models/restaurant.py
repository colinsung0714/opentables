from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Restaurant(db.Model):
    __tablename__ = 'restaurants'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    name = db.Column(db.String(100), nullable=False)
    restaurant_pic = db.Column(db.String(255))
    phone = db.Column(db.String(20), nullable=False)
    street = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100), nullable=False)
    zip_code = db.Column(db.Numeric(precision=5, scale=0), nullable=False)
    country = db.Column(db.String(100), nullable=False)
    review_num = db.Column(db.Integer, default=0)
    categories = db.Column(db.String(100), nullable=False)
    avg_rating= db.Column(db.Numeric(precision=3, scale=2), default=0)
    description = db.Column(db.String(255))
    avg_price = db.Column(db.Integer, default=0)
    lat = db.Column(db.Float)
    lng = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    owner = db.relationship('User', back_populates='restaurants')
    business_hours = db.relationship('Business_hour', back_populates='restaurant', cascade="all, delete-orphan")
    reservations = db.relationship('Reservation', back_populates='restaurant', cascade="all, delete-orphan")
    reviews = db.relationship('Review',  back_populates='restaurant', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'name': self.name,
            'restaurantPic': self.restaurant_pic,
            'phone' : self.phone,
            'street' : self.street,
            'city' : self.city,
            'state' : self.state,
            'zipCode' : self.zip_code,
            'country' : self.country,
            'reviewNum' : self.review_num,
            'categories' : self.categories,
            'avgRating' : self.avg_rating,
            'description' : self.description,
            'avgPrice' : self.avg_price,
            'lat' : self.lat,
            'lng' : self.lng,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at, 
            'business_hours':[bh.to_dict() for bh in self.business_hours],
            'reviews':[review.to_dict() for review in self.reviews]
        }
    
 

    


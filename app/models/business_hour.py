import enum
from .db import db, environment, SCHEMA, add_prefix_for_prod



class Days(enum.Enum):
    Monday = 'Monday'
    Tuesday = 'Tuesday'
    Wednesday = 'Wednesday'
    Thursday = 'Thursday'
    Friday = 'Friday'
    Saturday = 'Saturday'
    Sunday = 'Sunday'


class Business_hour(db.Model):
    __tablename__ = 'business_hours'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    day = db.Column(db.Enum(Days), nullable=False)
    start = db.Column(db.Time, nullable=False)
    end = db.Column(db.Time, nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('restaurants.id')))

    restaurant = db.relationship('Restaurant', back_populates='business_hours')
    
    def to_dict(self):
        return {
            'id':self.id,
            'day':self.day.name if self.day else None,
            'start':self.start.strftime('%H:%M') if self.start else None,
            'end':self.end.strftime('%H:%M') if self.end else None,
            'restaurantId':self.restaurant_id
        }
    
    
    
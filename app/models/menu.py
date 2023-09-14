from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Menu(db.Model):
    __tablename__ = 'menus'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('restaurants.id')))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    menu_items = db.relationship('MenuItem', back_populates='menu', cascade="all, delete-orphan")
    restaurant = db.relationship('Restaurant', back_populates='menus')
    def to_dict(self):
        return {
            'id':self.id,
            'restaurantId':self.restaurant_id,
            'menu_items':[item.to_dict() for item in self.menu_items]
        }

class MenuItem(db.Model):
    __tablename__ = 'menu_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    menu_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('menus.id')))
    name = db.Column(db.String(100))
    price = db.Column(db.Numeric(precision=6, scale=2), default=0)
    item_type = db.Column(db.String(100))
    description = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    menu = db.relationship('Menu', back_populates='menu_items')

    def to_dict(self):
        return {
            'id':self.id,
            'menuId' : self.menu_id,
            'name':self.name,
            'price':self.price,
            'item_type':self.item_type,
            'description':self.description
        }


    


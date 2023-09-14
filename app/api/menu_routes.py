from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import db, Menu, MenuItem
from datetime import datetime
from sqlalchemy import select
from sqlalchemy.orm import joinedload
from app.forms import NewReservationForm
from app.models import Reservation, Restaurant, User
from sqlalchemy.exc import IntegrityError
from app.api.helper import to_lower

menus_routes = Blueprint('menu', __name__)

@menus_routes.route('/restaurants/<int:restaurantId>/menus')
def restaurant_menus(restaurantId):
    restaurant_menu = Menu.query.filter(Menu.restaurant_id == restaurantId).all()
    if not len(restaurant_menu):
        return {'error':'no matching item'}
    return {"menuItems": [menu_item.to_dict() for menu_item in restaurant_menu[0].menu_items]}

@menus_routes.route('/restaurants/<int:restaurantId>/new', methods=['POST'])
@login_required
def new_menu(restaurantId):
    data = request.json
   
    restaurant = Restaurant.query.get(restaurantId)
    if restaurant:
        menu = Menu(
            restaurant_id = restaurantId
        )

        new_menu_item_list = [ MenuItem(item_type=to_lower(item['item_type']), name=to_lower(item['name']), price=item['price'], description=item['description']) for item in data]
        _ = [(db.session.add(item), menu.menu_items.append(item)) for item in new_menu_item_list]
        db.session.commit()
     
        return {"menuItems": [menu_item.to_dict() for menu_item in new_menu_item_list]}
    
@menus_routes.route('/restaurants/<int:menuId>/edit', methods=['PUT'])
@login_required
def update_menu(menuId):
    data = request.json
    menu = Menu.query.get(menuId)

    for item in data:
        if 'id' not in item:
      
            new_item = MenuItem(item_type=to_lower(item['item_type']), name=to_lower(item['name']), price=item['price'], description=item['description'])
            db.session.add(new_item)
            menu.menu_items.append(new_item)
        else:
            target_item = MenuItem.query.get(item['id'])
            target_item.item_type = to_lower(item['item_type'])
            target_item.name = to_lower(item['name'])
            target_item.price = item['price']
            target_item.description = item['description']
    db.session.commit()

    return {"menuItems": [menu_item.to_dict() for menu_item in menu.menu_items]}
     
@menus_routes.route('/<int:menuId>/delete', methods=['DELETE'])
@login_required
def delete_menu(menuId):
    menu = Menu.query.get(menuId)
    db.session.delete(menu)
    db.session.commit()
    return {'message': 'delete complete'}

     
@menus_routes.route('/menuitems/<int:menuItemId>', methods=['DELETE'])
@login_required
def delete_menu_item(menuItemId):
    menu_item = MenuItem.query.get(menuItemId)
    res = menu_item.to_dict()
    db.session.delete(menu_item)
    db.session.commit()
    return res
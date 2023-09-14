from app.models import db, Restaurant, Business_hour, Menu, MenuItem, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import time
from app.api.helper import to_lower
def seed_menus():
    restaurant_1 = Restaurant.query.get(1)
    menu_1 = Menu(
        restaurant_id= restaurant_1.id
    )

    menu_1_menu_item_1 = MenuItem(
        item_type = to_lower('Appetizers'),
        name = 'Crispy Veggie Egg Rolls',
        price =10.95,
        description='Assorted vegetable rolls fried to a crispy brown, served with our homemade sweet and sour sauce'
    )

    menu_1_menu_item_2 = MenuItem(
        item_type = to_lower('Soups'),
        name = 'Tom Kha',
        price =16.95,
        description='Thai coconut milk and lemongrass soup with mushrooms and your choice of protein'
    )

    menu_1_menu_item_3 = MenuItem(
        item_type = to_lower('Noodles'),
        name = 'Pad Thai',
        price =18.95,
        description='One of the most popular street food in Thailand. Pan‐fried rice noodles with scrambled eggs, bean sprouts, green onion and crushed peanuts'
    )

    menu_1_menu_item_4 = MenuItem(
        item_type = to_lower('Noodles'),
        name = 'Pad See Ew',
        price =18.95,
        description='Pan‐fried flat rice noodles with broccoli and scrambled eggs'
    )
   
    db.session.add(menu_1)
    db.session.add(menu_1_menu_item_1)
    db.session.add(menu_1_menu_item_2)
    db.session.add(menu_1_menu_item_3)
    db.session.add(menu_1_menu_item_4)
    menu_1.menu_items.append(menu_1_menu_item_1)
    menu_1.menu_items.append(menu_1_menu_item_2)
    menu_1.menu_items.append(menu_1_menu_item_3)
    menu_1.menu_items.append(menu_1_menu_item_4)
   
    db.session.commit()
    

def undo_menus():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.menu_items RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.menus RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM menu_items"))
        db.session.execute(text("DELETE FROM menus"))
        
    db.session.commit()
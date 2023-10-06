from app.models import db, Restaurant, Business_hour, Menu, MenuItem, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import time
from app.api.helper import to_lower
def seed_menus():
    restaurant_1 = Restaurant.query.get(1)
    restaurant_2 = Restaurant.query.get(2)
    restaurant_3 = Restaurant.query.get(3)
    restaurant_4 = Restaurant.query.get(4)
    restaurant_5 = Restaurant.query.get(5)
    restaurant_6 = Restaurant.query.get(6)
    restaurant_7 = Restaurant.query.get(7)
    restaurant_8 = Restaurant.query.get(8)
    restaurant_9 = Restaurant.query.get(9)
    restaurant_10 = Restaurant.query.get(10)

    menu_1 = Menu(
        restaurant_id= restaurant_1.id
    )
    menu_2 = Menu(
        restaurant_id= restaurant_2.id
    )
    menu_3 = Menu(
        restaurant_id= restaurant_3.id
    )
    menu_4 = Menu(
        restaurant_id= restaurant_4.id
    )
    menu_5 = Menu(
        restaurant_id= restaurant_5.id
    )
    menu_6 = Menu(
        restaurant_id= restaurant_6.id
    )
    menu_7 = Menu(
        restaurant_id= restaurant_7.id
    )
    menu_8 = Menu(
        restaurant_id= restaurant_8.id
    )
    menu_9 = Menu(
        restaurant_id= restaurant_9.id
    )
    menu_10 = Menu(
        restaurant_id= restaurant_10.id
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
        description='One of the most popular street food in Thailand. Pan-fried rice noodles with scrambled eggs, bean sprouts, green onion and crushed peanuts'
    )

    menu_1_menu_item_4 = MenuItem(
        item_type = to_lower('Noodles'),
        name = 'Pad See Ew',
        price =18.95,
        description='Pan‐fried flat rice noodles with broccoli and scrambled eggs'
    )
    menu_2_menu_item_1 = MenuItem(
        item_type = to_lower('Pizza'),
        name = 'Pepperoni Pizza',
        price =17.99,
        description='Rustic and spicy pepperoni with fresh Mozzarella and wild Greek oregano. Also available with white truffle oil.'
    )
    menu_2_menu_item_2 = MenuItem(
        item_type = to_lower('Pizza'),
        name = 'Three Cheese Pizza',
        price =16.99,
        description='Our tomato sauce with Mozzarella and fresh Mozzarella.'
    )
    menu_2_menu_item_3 = MenuItem(
        item_type = to_lower('Salads'),
        name = 'The Classic Caesar',
        price =13.99,
        description='Crisp Romaine lettuce with shaved Parmesan and smashed garlic butter croutons.'
    )
    menu_2_menu_item_4 = MenuItem(
        item_type = to_lower('Salads'),
        name = 'California Cobb',
        price =14.99,
        description="Nueske's applewood smoked bacon, avocado, chicken, tomatoes, chopped egg, fresh basil, and Gorgonzola."
    )
    menu_2_menu_item_5 = MenuItem(
        item_type = to_lower('Salads'),
        name = 'The Original BBQ Chicken Chopped Salad',
        price =17.99,
        description='Black beans, sweet corn, jicama, fresh cilantro, basil, crispy corn tortilla strips, Monterey Jack, and our herb ranch. Topped with tomatoes and scallions.'
    )

    menu_3_menu_item_1 = MenuItem(
        item_type = to_lower('Brunch'),
        name = 'Steak & Eggs',
        price =34.99,
        description='grilled skirt steak, salsa verde, sunny eggs, breakfast potatoes'
    )
    menu_3_menu_item_2 = MenuItem(
        item_type = to_lower('Mains'),
        name = 'Steamed Manila Clams',
        price =36.00,
        description='spicy tamarind broth, chinese sausage, fried bread, basil, pickled fresno chile, lime'
    )
    menu_3_menu_item_3 = MenuItem(
        item_type = to_lower('Mains'),
        name = 'Local Rockfish Steamed in Lotus Leaf',
        price =40.00,
        description='sticky rice, mushrooms, baby bok choy, ginger, sweet soy oyster sauce, yuzu'
    )
    menu_3_menu_item_4 = MenuItem(
        item_type = to_lower('Sides'),
        name = 'Coconut Chia Seed Parfait',
        price =10.99,
        description="jam, seasonal market fruit, housemade granola, mint"
    )
    menu_3_menu_item_5 = MenuItem(
        item_type = to_lower('Cocktails'),
        name = 'Sichuan Opera',
        price =17.99,
        description='Sour w/ Sichuan Peppercorn Infused Domingo Mezcal, Falernum Bitters, Grenadine, Pomegranate'
    )

    menu_4_menu_item_1 = MenuItem(
        item_type = to_lower('Rice & Noodles'),
        name = 'Shoyu Ramen',
        price =19.50,
        description='soy flavored pork broth, pork belly, egg, mizuna, black garlic oil'
    )
    menu_4_menu_item_2 = MenuItem(
        item_type = to_lower('Mains'),
        name = 'Grilled N.Y. Strip Steak',
        price =62.00,
        description='grilled broccolini, summer squash, nam jim, port wine tare, fresh wasabi'
    )
    menu_4_menu_item_3 = MenuItem(
        item_type = to_lower('Mains'),
        name = 'Japanese A5 Wagyu Striploin',
        price =97.00,
        description='ponzu, red radish, shiso, wasabi oil'
    )
    menu_4_menu_item_4 = MenuItem(
        item_type = to_lower('To Share'),
        name = 'White Sesame Caesar Salad',
        price =16.99,
        description="little gem lettuce, anchovy, housemade sourdough croutons, parmesan"
    )
    menu_4_menu_item_5 = MenuItem(
        item_type = to_lower('Desserts'),
        name = 'Matcha Green Tea Tiramisu',
        price =16.50,
        description='mascarpone cream, white chocolate leaf'
    )

    menu_5_menu_item_1 = MenuItem(
        item_type = to_lower('Daily Fresh Oyster'),
        name = 'Raw Oyster',
        price =4.00,
        description='Homemade ponzu sauce, momiji radidh, scallion; Items are 2 ordered minimum'
    )
    menu_5_menu_item_2 = MenuItem(
        item_type = to_lower('Sashimi'),
        name = 'Assorted Sashimi',
        price =22.00,
        description='Items are 2 ordered minimum'
    )
    menu_5_menu_item_3 = MenuItem(
        item_type = to_lower('Izakaya Cold Dish'),
        name = 'Uni & Kobe Beef Sashimi',
        price =21.00,
        description='Us kobe beef, sea urchin, shiso leaf, sweet soy sauce'
    )
    menu_5_menu_item_4 = MenuItem(
        item_type = to_lower('Izakaya Warm Dish'),
        name = 'Galic Edamamae',
        price =5.99,
        description="Edamame, garlic, soy sauce"
    )
    menu_5_menu_item_5 = MenuItem(
        item_type = to_lower('Salad'),
        name = 'Octopus & Radish Salad',
        price =13.50,
        description='Octopus, daikon radish, mizuna leaf, ginger dressing'
    )

    menu_6_menu_item_1 = MenuItem(
        item_type = to_lower('Soup'),
        name = 'Spicy Beef Soup',
        price =9.00,
        description='slow cooked spicy pulled beef soup, tofu, bean sprouts'
    )
    menu_6_menu_item_2 = MenuItem(
        item_type = to_lower('Noodle'),
        name = 'Garlic Fried Noodle',
        price =10.00,
        description='pan fried thick noodles, shibazuke pickles, shiso leaf, garlic butter, soy sauce'
    )
    menu_6_menu_item_3 = MenuItem(
        item_type = to_lower('Rice'),
        name = 'Fried Garlic Rice',
        price =10.00,
        description='garlic rice, green onion, shibazuke pickles, shiso in sizziling stone pot'
    )
    menu_6_menu_item_4 = MenuItem(
        item_type = to_lower('Sashimi'),
        name = 'Prime Beef Tartare "Yukke"',
        price =13.99,
        description="raw beef prime ribeye tartare with Jidori egg york"
    )
    menu_6_menu_item_5 = MenuItem(
        item_type = to_lower('Classic Comfort'),
        name = 'Seasoned Vegetables',
        price =8.50,
        description='bean sprouts, burdock, spinach, daikon radish'
    )

    menu_7_menu_item_1 = MenuItem(
        item_type = to_lower('Tostadas'),
        name = 'El Rey*',
        price =28.00,
        description='Scallops squares with shrimp cooked in lime, purple onion and a mix of black sauce and green sauce'
    )
    menu_7_menu_item_2 = MenuItem(
        item_type = to_lower('Tiraditos'),
        name = 'Tiraditos de Atún',
        price =25.00,
        description='Fresh tuna slices, seasoned with our oriental mix of jalapeño, carrot and onion'
    )
    menu_7_menu_item_3 = MenuItem(
        item_type = to_lower('Snacks'),
        name = 'Shrimp Popcorn',
        price =20.00,
        description='Delicious bread shrimps combined with popcorn'
    )
    menu_7_menu_item_4 = MenuItem(
        item_type = to_lower('House Specialties'),
        name = 'Langosta Puerto Nuevo',
        price =40.00,
        description="Fried lobster, seasoned with Baja flavour"
    )
    menu_7_menu_item_5 = MenuItem(
        item_type = to_lower('House Specialties'),
        name = 'Pulpo Zarandeado',
        price =40.00,
        description='Marinated octupus with all the love in the world'
    )

    menu_8_menu_item_1 = MenuItem(
        item_type = to_lower('Small Plates'),
        name = 'Burrata di Stagione',
        price =16.00,
        description='fuji apple, roasted butternut squash, hazelnut, herb breadcrumb, calabrian agrodolce'
    )
    menu_8_menu_item_2 = MenuItem(
        item_type = to_lower('Sandwiches'),
        name = 'Caprese Sandwich',
        price =15.50,
        description='herb roasted tomato, stracciatella, torn basil, arugula, house pesto, calabrian aioli'
    )
    menu_8_menu_item_3 = MenuItem(
        item_type = to_lower('Fresh Pasta & Entrées'),
        name = 'Spaghetti & Meatballs',
        price =20.00,
        description='traditional tomato sauce, basil, olive oil, pecorino'
    )
    menu_8_menu_item_4 = MenuItem(
        item_type = to_lower('Pizza'),
        name = 'Spicy Meatball',
        price =20.00,
        description="provolone piccante, house ricotta, mozzarella, pecorino romano, red sauce"
    )
    menu_8_menu_item_5 = MenuItem(
        item_type = to_lower('Salads'),
        name = 'Little Gem Caesar',
        price =14.00,
        description='grated grana padano, herb breadcrumb, cracked pepper'
    )
    
    menu_9_menu_item_1 = MenuItem(
        item_type = to_lower('Starters'),
        name = 'Meat & Cheese Platter',
        price =22.00,
        description='Fine Italian Creminelli® meats & assorted cheese from the Beehive Cheese Company, seasonal accompaniments'
    )
    menu_9_menu_item_2 = MenuItem(
        item_type = to_lower('Soups'),
        name = 'Mushroom Bisque',
        price =7.00,
        description='Braised cremini mushrooms, basil oil'
    )
    menu_9_menu_item_3 = MenuItem(
        item_type = to_lower('Signature Entrees'),
        name = 'Tenderloin Medallions',
        price =48.00,
        description='Beef Tenderloin, broccolini, heirloom fingerling potatoes, mango chutney or marsala reduction'
    )
    menu_9_menu_item_4 = MenuItem(
        item_type = to_lower('Grill'),
        name = 'Filet Mignon',
        price =80.00,
        description="Wagyu beef, herbed lemon butter, parmesan truffle fries"
    )
    menu_9_menu_item_5 = MenuItem(
        item_type = to_lower('Pasta'),
        name = 'Shrimp Scampi',
        price =26.00,
        description='Garlic shrimp, fresh linguine, roasted tomatoes, pinot butter lemon reduction'
    )
    
    menu_10_menu_item_1 = MenuItem(
        item_type = to_lower('Appetizers'),
        name = 'Peppercorn Maple Glazed Bacon',
        price =22.00,
        description='Rosemary Maple Smoked Bacon, Pickled Seasonal Vegetables'
    )
    menu_10_menu_item_2 = MenuItem(
        item_type = to_lower('Soups and Salads'),
        name = 'Soup du Jour',
        price =15.00,
        description='Chefs Daily Soup'
    )
    menu_10_menu_item_3 = MenuItem(
        item_type = to_lower('Signature Entrees'),
        name = 'Bouillabaisse',
        price =64.00,
        description='Lobster, Scallops, Shrimp, Sea Bass, Clams, Mussels, Grilled Baguette, Rouille'
    )
    menu_10_menu_item_4 = MenuItem(
        item_type = to_lower('Signature Entrees'),
        name = 'Cherrywood Smoked Salmon',
        price =58.00,
        description="Little Neck Clams, Runner Beans, Kalamata Olives, Haricot Verts, Mediterranean Matbucha Sauce"
    )
    menu_10_menu_item_5 = MenuItem(
        item_type = to_lower('Desserts'),
        name = 'Mango Coconut Roll',
        price =11.00,
        description='Vegan Coconut Rice and Mango, Wrapped in Crunchy Phyllo Dough'
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
    db.session.add(menu_2)
    db.session.add(menu_2_menu_item_1)
    db.session.add(menu_2_menu_item_2)
    db.session.add(menu_2_menu_item_3)
    db.session.add(menu_2_menu_item_4)
    db.session.add(menu_2_menu_item_5)
    menu_2.menu_items.append(menu_2_menu_item_1)
    menu_2.menu_items.append(menu_2_menu_item_2)
    menu_2.menu_items.append(menu_2_menu_item_3)
    menu_2.menu_items.append(menu_2_menu_item_4)
    menu_2.menu_items.append(menu_2_menu_item_5)
    
    db.session.add(menu_3)
    db.session.add(menu_3_menu_item_1)
    db.session.add(menu_3_menu_item_2)
    db.session.add(menu_3_menu_item_3)
    db.session.add(menu_3_menu_item_4)
    db.session.add(menu_3_menu_item_5)
    menu_3.menu_items.append(menu_3_menu_item_1)
    menu_3.menu_items.append(menu_3_menu_item_2)
    menu_3.menu_items.append(menu_3_menu_item_3)
    menu_3.menu_items.append(menu_3_menu_item_4)
    menu_3.menu_items.append(menu_3_menu_item_5)

    db.session.add(menu_4)
    db.session.add(menu_4_menu_item_1)
    db.session.add(menu_4_menu_item_2)
    db.session.add(menu_4_menu_item_3)
    db.session.add(menu_4_menu_item_4)
    db.session.add(menu_4_menu_item_5)
    menu_4.menu_items.append(menu_4_menu_item_1)
    menu_4.menu_items.append(menu_4_menu_item_2)
    menu_4.menu_items.append(menu_4_menu_item_3)
    menu_4.menu_items.append(menu_4_menu_item_4)
    menu_4.menu_items.append(menu_4_menu_item_5)

    db.session.add(menu_5)
    db.session.add(menu_5_menu_item_1)
    db.session.add(menu_5_menu_item_2)
    db.session.add(menu_5_menu_item_3)
    db.session.add(menu_5_menu_item_4)
    db.session.add(menu_5_menu_item_5)
    menu_5.menu_items.append(menu_5_menu_item_1)
    menu_5.menu_items.append(menu_5_menu_item_2)
    menu_5.menu_items.append(menu_5_menu_item_3)
    menu_5.menu_items.append(menu_5_menu_item_4)
    menu_5.menu_items.append(menu_5_menu_item_5)

    db.session.add(menu_6)
    db.session.add(menu_6_menu_item_1)
    db.session.add(menu_6_menu_item_2)
    db.session.add(menu_6_menu_item_3)
    db.session.add(menu_6_menu_item_4)
    db.session.add(menu_6_menu_item_5)
    menu_6.menu_items.append(menu_6_menu_item_1)
    menu_6.menu_items.append(menu_6_menu_item_2)
    menu_6.menu_items.append(menu_6_menu_item_3)
    menu_6.menu_items.append(menu_6_menu_item_4)
    menu_6.menu_items.append(menu_6_menu_item_5)

    db.session.add(menu_7)
    db.session.add(menu_7_menu_item_1)
    db.session.add(menu_7_menu_item_2)
    db.session.add(menu_7_menu_item_3)
    db.session.add(menu_7_menu_item_4)
    db.session.add(menu_7_menu_item_5)
    menu_7.menu_items.append(menu_7_menu_item_1)
    menu_7.menu_items.append(menu_7_menu_item_2)
    menu_7.menu_items.append(menu_7_menu_item_3)
    menu_7.menu_items.append(menu_7_menu_item_4)
    menu_7.menu_items.append(menu_7_menu_item_5)

    db.session.add(menu_8)
    db.session.add(menu_8_menu_item_1)
    db.session.add(menu_8_menu_item_2)
    db.session.add(menu_8_menu_item_3)
    db.session.add(menu_8_menu_item_4)
    db.session.add(menu_8_menu_item_5)
    menu_8.menu_items.append(menu_8_menu_item_1)
    menu_8.menu_items.append(menu_8_menu_item_2)
    menu_8.menu_items.append(menu_8_menu_item_3)
    menu_8.menu_items.append(menu_8_menu_item_4)
    menu_8.menu_items.append(menu_8_menu_item_5)

    db.session.add(menu_9)
    db.session.add(menu_9_menu_item_1)
    db.session.add(menu_9_menu_item_2)
    db.session.add(menu_9_menu_item_3)
    db.session.add(menu_9_menu_item_4)
    db.session.add(menu_9_menu_item_5)
    menu_9.menu_items.append(menu_9_menu_item_1)
    menu_9.menu_items.append(menu_9_menu_item_2)
    menu_9.menu_items.append(menu_9_menu_item_3)
    menu_9.menu_items.append(menu_9_menu_item_4)
    menu_9.menu_items.append(menu_9_menu_item_5)

    db.session.add(menu_10)
    db.session.add(menu_10_menu_item_1)
    db.session.add(menu_10_menu_item_2)
    db.session.add(menu_10_menu_item_3)
    db.session.add(menu_10_menu_item_4)
    db.session.add(menu_10_menu_item_5)
    menu_10.menu_items.append(menu_10_menu_item_1)
    menu_10.menu_items.append(menu_10_menu_item_2)
    menu_10.menu_items.append(menu_10_menu_item_3)
    menu_10.menu_items.append(menu_10_menu_item_4)
    menu_10.menu_items.append(menu_10_menu_item_5)
    
    db.session.commit()
    

def undo_menus():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.menu_items RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.menus RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM menu_items"))
        db.session.execute(text("DELETE FROM menus"))
        
    db.session.commit()
from flask.cli import AppGroup
from .users import seed_users, undo_users
from .restaurants import seed_restaurants, undo_restaurants
from .business_hours import seed_business_hours, undo_business_hours
from .reservations import seed_reservations, undo_reservations
from .reviews import seed_reviews, undo_reviews
from .menus import seed_menus, undo_menus
from .restaurant_images import seed_restaurant_images, undo_restaurant_images
from .review_images import seed_review_images, undo_review_images
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_review_images()
        undo_restaurant_images
        undo_menus()
        undo_reviews()
        undo_reservations()
        undo_business_hours()
        undo_restaurants()
        undo_users()
    seed_users()
    seed_restaurants()
    seed_business_hours()
    seed_reservations()
    seed_reviews()
    seed_menus()
    seed_restaurant_images()
    seed_review_images()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_review_images()
    undo_restaurant_images
    undo_menus()
    undo_reviews()
    undo_reservations()
    undo_business_hours()
    undo_restaurants()
    undo_users()
    # Add other undo functions here
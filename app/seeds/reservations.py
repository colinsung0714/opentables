from app.models import db, Restaurant, User, Reservation, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_reservations():
    new_reservation = Reservation(
        party=2,
        reservation_date=datetime(2023, 9, 8, 16,30)
    )
    
    db.session.add(new_reservation)
    restaurant = Restaurant.query.get(1)
    user = User.query.get(2)
    user.reservations.append(new_reservation)
    restaurant.reservations.append(new_reservation)
    db.session.add(new_reservation)
    db.session.commit()

def undo_reservations():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reservations RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reservations"))
        
    db.session.commit()
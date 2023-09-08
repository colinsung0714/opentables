from app.models import db, Restaurant, User, Reservation, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

def seed_reservations():
    first_reservation = Reservation(
        party=2,
        reservation_date=datetime(2023, 9, 20, 16,30)
    )
    second_reservation = Reservation(
        party=2,
        reservation_date=datetime(2023, 9, 1, 16,00)
    )
    
    db.session.add(first_reservation)
    db.session.add(second_reservation)
    restaurant = Restaurant.query.get(1)
    user = User.query.get(1)
    user.reservations.append(first_reservation)
    user.reservations.append(second_reservation)
    restaurant.reservations.append(first_reservation)
    restaurant.reservations.append(second_reservation)

    db.session.commit()

def undo_reservations():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reservations RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reservations"))
        
    db.session.commit()
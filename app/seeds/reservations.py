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
    third_reservation = Reservation(
        party=4,
        reservation_date=datetime(2023, 9, 5, 14,00)
    )
    four_reservation = Reservation(
        party=2,
        reservation_date=datetime(2023, 9, 6, 14,00)
    )
    five_reservation = Reservation(
        party=2,
        reservation_date=datetime(2023, 9, 5, 15,30)
    )
    six_reservation = Reservation(
        party=2,
        reservation_date=datetime(2023, 12, 5, 15,30)
    )
    seven_reservation = Reservation(
        party=2,
        reservation_date=datetime(2023, 11, 11, 15,30)
    )
    eight_reservation = Reservation(
        party=2,
        reservation_date=datetime(2024, 2, 5, 15,30)
    )
    
    db.session.add(first_reservation)
    db.session.add(second_reservation)
    db.session.add(third_reservation)
    db.session.add(four_reservation)
    db.session.add(five_reservation)
    db.session.add(six_reservation)
    db.session.add(seven_reservation)
    db.session.add(eight_reservation)
    restaurant = Restaurant.query.get(1)
    restaurant2 = Restaurant.query.get(2)
    restaurant3 = Restaurant.query.get(3)
    restaurant4 = Restaurant.query.get(4)
    restaurant5 = Restaurant.query.get(5)
    user = User.query.get(1)
    user2 = User.query.get(2)
    user.reservations.append(first_reservation)
    user.reservations.append(second_reservation)
    user.reservations.append(five_reservation)
    user2.reservations.append(third_reservation)
    user2.reservations.append(four_reservation)
    user.reservations.append(six_reservation)
    user.reservations.append(seven_reservation)
    user.reservations.append(eight_reservation)
    restaurant.reservations.append(first_reservation)
    restaurant.reservations.append(second_reservation)
    restaurant.reservations.append(third_reservation)
    restaurant2.reservations.append(four_reservation)
    restaurant2.reservations.append(five_reservation)
    restaurant3.reservations.append(six_reservation)
    restaurant4.reservations.append(seven_reservation)
    restaurant5.reservations.append(eight_reservation)
    db.session.commit()

def undo_reservations():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reservations RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reservations"))
        
    db.session.commit()
from app.models import db, Restaurant, Business_hour, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import time

def seed_business_hours():
    monday_hours = Business_hour(
        day='Monday',
        start=time(9,0),
        end=time(18,0)
    )
    tues_hours = Business_hour(
        day='Tuesday',
        start=time(9,0),
        end=time(18,0)
    )
    wednes_hours = Business_hour(
        day='Wednesday',
        start=time(9,0),
        end=time(18,0)
    )
    thurs_hours = Business_hour(
        day='Thursday',
        start=time(9,0),
        end=time(18,0)
    )
    fri_hours = Business_hour(
        day='Friday',
        start=time(9,0),
        end=time(18,0)
    )
    sat_hours = Business_hour(
        day='Saturday',
        start=time(0,0),
        end=time(0,0)
    )
    sun_hours = Business_hour(
        day='Sunday',
        start=time(0,0),
        end=time(0,0)
    )
    restaurant= Restaurant.query.get(1)
    restaurant.business_hours.append(monday_hours)
    restaurant.business_hours.append(tues_hours)
    restaurant.business_hours.append(wednes_hours)
    restaurant.business_hours.append(thurs_hours)
    restaurant.business_hours.append(fri_hours)
    restaurant.business_hours.append(sat_hours)
    restaurant.business_hours.append(sun_hours)
    db.session.add(monday_hours)
    db.session.add(tues_hours)
    db.session.add(wednes_hours)
    db.session.add(thurs_hours)
    db.session.add(fri_hours)
    db.session.add(sat_hours)
    db.session.add(sun_hours)

    db.session.commit()

def undo_business_hours():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.business_hours RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM business_hours"))
        
    db.session.commit()
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

    monday_hours_two = Business_hour(
        day='Monday',
        start=time(10,0),
        end=time(20,0)
    )
    tues_hours_two = Business_hour(
        day='Tuesday',
        start=time(10,0),
        end=time(20,0)
    )
    wednes_hours_two = Business_hour(
        day='Wednesday',
        start=time(11,0),
        end=time(20,0)
    )
    thurs_hours_two = Business_hour(
        day='Thursday',
        start=time(11,0),
        end=time(20,0)
    )
    fri_hours_two = Business_hour(
        day='Friday',
        start=time(11,0),
        end=time(20,0)
    )

    monday_hours_three = Business_hour(
        day='Monday',
        start=time(7,0),
        end=time(19,30)
    )
    tues_hours_three = Business_hour(
        day='Tuesday',
        start=time(9,0),
        end=time(19,30)
    )
    wednes_hours_three = Business_hour(
        day='Wednesday',
        start=time(9,0),
        end=time(19,30)
    )
    thurs_hours_three = Business_hour(
        day='Thursday',
        start=time(9,0),
        end=time(18,30)
    )
    fri_hours_three = Business_hour(
        day='Friday',
        start=time(9,0),
        end=time(18,0)
    )

    monday_hours_four = Business_hour(
        day='Monday',
        start=time(11,0),
        end=time(23,0)
    )
    tues_hours_four = Business_hour(
        day='Tuesday',
        start=time(11,0),
        end=time(23,0)
    )
    wednes_hours_four = Business_hour(
        day='Wednesday',
        start=time(11,0),
        end=time(23,0)
    )
    thurs_hours_four = Business_hour(
        day='Thursday',
        start=time(11,0),
        end=time(23,0)
    )
    fri_hours_four = Business_hour(
        day='Friday',
        start=time(11,0),
        end=time(23,0)
    )

    sat_hours_four = Business_hour(
        day='Saturday',
        start=time(11,0),
        end=time(23,0)
    )

    sun_hours_four = Business_hour(
        day='Sunday',
        start=time(11,0),
        end=time(23,0)
    )

    monday_hours_five = Business_hour(
        day='Monday',
        start=time(8,0),
        end=time(23,0)
    )
    tues_hours_five = Business_hour(
        day='Tuesday',
        start=time(8,0),
        end=time(20,0)
    )
    wednes_hours_five = Business_hour(
        day='Wednesday',
        start=time(8,0),
        end=time(23,00)
    )
    thurs_hours_five = Business_hour(
        day='Thursday',
        start=time(7,0),
        end=time(21,0)
    )
    fri_hours_five = Business_hour(
        day='Friday',
        start=time(7,0),
        end=time(23,00)
    )

    sat_hours_five = Business_hour(
        day='Saturday',
        start=time(7,0),
        end=time(23,0)
    )

    sun_hours_five = Business_hour(
        day='Sunday',
        start=time(7,0),
        end=time(23,0)
    )

    monday_hours_six = Business_hour(
        day='Monday',
        start=time(7,0),
        end=time(22,0)
    )
    tues_hours_six = Business_hour(
        day='Tuesday',
        start=time(7,0),
        end=time(22,0)
    )
    wednes_hours_six = Business_hour(
        day='Wednesday',
        start=time(7,0),
        end=time(22,00)
    )
    thurs_hours_six = Business_hour(
        day='Thursday',
        start=time(7,0),
        end=time(22,0)
    )
    fri_hours_six = Business_hour(
        day='Friday',
        start=time(7,0),
        end=time(22,00)
    )

    sat_hours_six = Business_hour(
        day='Saturday',
        start=time(9,0),
        end=time(18,0)
    )

    sun_hours_six = Business_hour(
        day='Sunday',
        start=time(9,0),
        end=time(18,0)
    )

    monday_hours_seven = Business_hour(
        day='Monday',
        start=time(7,0),
        end=time(22,0)
    )
    tues_hours_seven = Business_hour(
        day='Tuesday',
        start=time(7,0),
        end=time(22,0)
    )
    wednes_hours_seven = Business_hour(
        day='Wednesday',
        start=time(7,0),
        end=time(22,00)
    )
    thurs_hours_seven = Business_hour(
        day='Thursday',
        start=time(7,0),
        end=time(22,0)
    )
    fri_hours_seven = Business_hour(
        day='Friday',
        start=time(7,0),
        end=time(22,00)
    )

    sat_hours_seven = Business_hour(
        day='Saturday',
        start=time(9,0),
        end=time(18,0)
    )

    sun_hours_seven = Business_hour(
        day='Sunday',
        start=time(9,0),
        end=time(18,0)
    )

    monday_hours_eight = Business_hour(
        day='Monday',
        start=time(9,0),
        end=time(19,0)
    )
    tues_hours_eight = Business_hour(
        day='Tuesday',
        start=time(9,0),
        end=time(19,0)
    )
    wednes_hours_eight = Business_hour(
        day='Wednesday',
        start=time(9,0),
        end=time(19,00)
    )
    thurs_hours_eight = Business_hour(
        day='Thursday',
        start=time(9,0),
        end=time(19,0)
    )
    fri_hours_eight = Business_hour(
        day='Friday',
        start=time(9,0),
        end=time(19,00)
    )

    sat_hours_eight = Business_hour(
        day='Saturday',
        start=time(9,0),
        end=time(19,0)
    )

    sun_hours_eight = Business_hour(
        day='Sunday',
        start=time(9,0),
        end=time(19,0)
    )

    
    monday_hours_nine = Business_hour(
        day='Monday',
        start=time(9,0),
        end=time(19,0)
    )
    tues_hours_nine = Business_hour(
        day='Tuesday',
        start=time(9,0),
        end=time(19,0)
    )
    wednes_hours_nine = Business_hour(
        day='Wednesday',
        start=time(9,0),
        end=time(19,00)
    )
    thurs_hours_nine = Business_hour(
        day='Thursday',
        start=time(9,0),
        end=time(19,0)
    )
    fri_hours_nine = Business_hour(
        day='Friday',
        start=time(9,0),
        end=time(19,00)
    )

    monday_hours_ten = Business_hour(
        day='Monday',
        start=time(11,0),
        end=time(23,0)
    )
    tues_hours_ten = Business_hour(
        day='Tuesday',
        start=time(11,0),
        end=time(23,0)
    )
    wednes_hours_ten = Business_hour(
        day='Wednesday',
        start=time(11,0),
        end=time(23,00)
    )
    thurs_hours_ten = Business_hour(
        day='Thursday',
        start=time(11,0),
        end=time(23,0)
    )
    fri_hours_ten = Business_hour(
        day='Friday',
        start=time(11,0),
        end=time(23,00)
    )

    sat_hours_ten = Business_hour(
        day='Saturday',
        start=time(11,0),
        end=time(23,0)
    )

    sun_hours_ten = Business_hour(
        day='Sunday',
        start=time(11,0),
        end=time(23,0)
    )

    monday_hours_eleven = Business_hour(
        day='Monday',
        start=time(6,0),
        end=time(20,0)
    )
    tues_hours_eleven = Business_hour(
        day='Tuesday',
        start=time(6,0),
        end=time(20,0)
    )
    wednes_hours_eleven = Business_hour(
        day='Wednesday',
        start=time(6,0),
        end=time(20,00)
    )
    thurs_hours_eleven = Business_hour(
        day='Thursday',
        start=time(6,0),
        end=time(20,0)
    )
    fri_hours_eleven = Business_hour(
        day='Friday',
        start=time(6,0),
        end=time(20,00)
    )

    sat_hours_eleven = Business_hour(
        day='Saturday',
        start=time(6,0),
        end=time(20,0)
    )

    sun_hours_eleven = Business_hour(
        day='Sunday',
        start=time(6,0),
        end=time(20,0)
    )

    monday_hours_twelve = Business_hour(
        day='Monday',
        start=time(8,0),
        end=time(20,0)
    )
    tues_hours_twelve = Business_hour(
        day='Tuesday',
        start=time(8,0),
        end=time(20,0)
    )
    wednes_hours_twelve = Business_hour(
        day='Wednesday',
        start=time(8,0),
        end=time(20,00)
    )
    thurs_hours_twelve = Business_hour(
        day='Thursday',
        start=time(8,0),
        end=time(20,0)
    )
    fri_hours_twelve = Business_hour(
        day='Friday',
        start=time(8,0),
        end=time(20,00)
    )

    sat_hours_twelve = Business_hour(
        day='Saturday',
        start=time(8,0),
        end=time(20,0)
    )

    sun_hours_twelve = Business_hour(
        day='Sunday',
        start=time(8,0),
        end=time(20,0)
    )

    monday_hours_thirteen = Business_hour(
        day='Monday',
        start=time(8,0),
        end=time(20,0)
    )
    tues_hours_thirteen = Business_hour(
        day='Tuesday',
        start=time(8,0),
        end=time(20,0)
    )
    wednes_hours_thirteen = Business_hour(
        day='Wednesday',
        start=time(8,0),
        end=time(20,00)
    )
    thurs_hours_thirteen = Business_hour(
        day='Thursday',
        start=time(8,0),
        end=time(20,0)
    )
    fri_hours_thirteen = Business_hour(
        day='Friday',
        start=time(8,0),
        end=time(20,00)
    )

    sat_hours_thirteen = Business_hour(
        day='Saturday',
        start=time(8,0),
        end=time(20,0)
    )

    sun_hours_thirteen = Business_hour(
        day='Sunday',
        start=time(8,0),
        end=time(20,0)
    )

    monday_hours_fourteen = Business_hour(
        day='Monday',
        start=time(9,0),
        end=time(21,0)
    )
    tues_hours_fourteen = Business_hour(
        day='Tuesday',
        start=time(9,0),
        end=time(21,0)
    )
    wednes_hours_fourteen = Business_hour(
        day='Wednesday',
        start=time(9,0),
        end=time(21,00)
    )
    thurs_hours_fourteen = Business_hour(
        day='Thursday',
        start=time(9,0),
        end=time(21,0)
    )
    fri_hours_fourteen = Business_hour(
        day='Friday',
        start=time(9,0),
        end=time(21,00)
    )

    sat_hours_fourteen = Business_hour(
        day='Saturday',
        start=time(9,0),
        end=time(21,0)
    )

    sun_hours_fourteen = Business_hour(
        day='Sunday',
        start=time(9,0),
        end=time(21,0)
    )

    monday_hours_fifteen = Business_hour(
        day='Monday',
        start=time(9,0),
        end=time(21,0)
    )
    tues_hours_fifteen = Business_hour(
        day='Tuesday',
        start=time(9,0),
        end=time(21,0)
    )
    wednes_hours_fifteen = Business_hour(
        day='Wednesday',
        start=time(9,0),
        end=time(21,00)
    )
    thurs_hours_fifteen = Business_hour(
        day='Thursday',
        start=time(9,0),
        end=time(21,0)
    )
    fri_hours_fifteen = Business_hour(
        day='Friday',
        start=time(9,0),
        end=time(21,00)
    )

    sat_hours_fifteen = Business_hour(
        day='Saturday',
        start=time(9,0),
        end=time(21,0)
    )

    sun_hours_fifteen = Business_hour(
        day='Sunday',
        start=time(9,0),
        end=time(21,0)
    )


    restaurant= Restaurant.query.get(1)
    restaurant.business_hours.append(monday_hours)
    restaurant.business_hours.append(tues_hours)
    restaurant.business_hours.append(wednes_hours)
    restaurant.business_hours.append(thurs_hours)
    restaurant.business_hours.append(fri_hours)

    restaurant_two = Restaurant.query.get(2)
    restaurant_two.business_hours.append(monday_hours_two)
    restaurant_two.business_hours.append(tues_hours_two)
    restaurant_two.business_hours.append(wednes_hours_two)
    restaurant_two.business_hours.append(thurs_hours_two)
    restaurant_two.business_hours.append(fri_hours_two)

    restaurant_three = Restaurant.query.get(3)
    restaurant_three.business_hours.append(monday_hours_three)
    restaurant_three.business_hours.append(tues_hours_three)
    restaurant_three.business_hours.append(wednes_hours_three)
    restaurant_three.business_hours.append(thurs_hours_three)
    restaurant_three.business_hours.append(fri_hours_three)

    restaurant_three = Restaurant.query.get(4)
    restaurant_three.business_hours.append(monday_hours_four)
    restaurant_three.business_hours.append(tues_hours_four)
    restaurant_three.business_hours.append(wednes_hours_four)
    restaurant_three.business_hours.append(thurs_hours_four)
    restaurant_three.business_hours.append(fri_hours_four)
    restaurant_three.business_hours.append(sat_hours_four)
    restaurant_three.business_hours.append(sun_hours_four)

    restaurant_three = Restaurant.query.get(5)
    restaurant_three.business_hours.append(monday_hours_five)
    restaurant_three.business_hours.append(tues_hours_five)
    restaurant_three.business_hours.append(wednes_hours_five)
    restaurant_three.business_hours.append(thurs_hours_five)
    restaurant_three.business_hours.append(fri_hours_five)
    restaurant_three.business_hours.append(sat_hours_five)
    restaurant_three.business_hours.append(sun_hours_five)

    restaurant_three = Restaurant.query.get(6)
    restaurant_three.business_hours.append(monday_hours_six)
    restaurant_three.business_hours.append(tues_hours_six)
    restaurant_three.business_hours.append(wednes_hours_six)
    restaurant_three.business_hours.append(thurs_hours_six)
    restaurant_three.business_hours.append(fri_hours_six)
    restaurant_three.business_hours.append(sat_hours_six)
    restaurant_three.business_hours.append(sun_hours_six)

    restaurant_three = Restaurant.query.get(7)
    restaurant_three.business_hours.append(monday_hours_seven)
    restaurant_three.business_hours.append(tues_hours_seven)
    restaurant_three.business_hours.append(wednes_hours_seven)
    restaurant_three.business_hours.append(thurs_hours_seven)
    restaurant_three.business_hours.append(fri_hours_seven)
    restaurant_three.business_hours.append(sat_hours_seven)
    restaurant_three.business_hours.append(sun_hours_seven)

    restaurant_three = Restaurant.query.get(8)
    restaurant_three.business_hours.append(monday_hours_eight)
    restaurant_three.business_hours.append(tues_hours_eight)
    restaurant_three.business_hours.append(wednes_hours_eight)
    restaurant_three.business_hours.append(thurs_hours_eight)
    restaurant_three.business_hours.append(fri_hours_eight)
    restaurant_three.business_hours.append(sat_hours_eight)
    restaurant_three.business_hours.append(sun_hours_eight)

    restaurant_three = Restaurant.query.get(9)
    restaurant_three.business_hours.append(monday_hours_nine)
    restaurant_three.business_hours.append(tues_hours_nine)
    restaurant_three.business_hours.append(wednes_hours_nine)
    restaurant_three.business_hours.append(thurs_hours_nine)
    restaurant_three.business_hours.append(fri_hours_nine)

    restaurant_three = Restaurant.query.get(10)
    restaurant_three.business_hours.append(monday_hours_ten)
    restaurant_three.business_hours.append(tues_hours_ten)
    restaurant_three.business_hours.append(wednes_hours_ten)
    restaurant_three.business_hours.append(thurs_hours_ten)
    restaurant_three.business_hours.append(fri_hours_ten)
    restaurant_three.business_hours.append(sat_hours_ten)
    restaurant_three.business_hours.append(sun_hours_ten)

    restaurant_three = Restaurant.query.get(11)
    restaurant_three.business_hours.append(monday_hours_eleven)
    restaurant_three.business_hours.append(tues_hours_eleven)
    restaurant_three.business_hours.append(wednes_hours_eleven)
    restaurant_three.business_hours.append(thurs_hours_eleven)
    restaurant_three.business_hours.append(fri_hours_eleven)
    restaurant_three.business_hours.append(sat_hours_eleven)
    restaurant_three.business_hours.append(sun_hours_eleven)

    restaurant_three = Restaurant.query.get(12)
    restaurant_three.business_hours.append(monday_hours_twelve)
    restaurant_three.business_hours.append(tues_hours_twelve)
    restaurant_three.business_hours.append(wednes_hours_twelve)
    restaurant_three.business_hours.append(thurs_hours_twelve)
    restaurant_three.business_hours.append(fri_hours_twelve)
    restaurant_three.business_hours.append(sat_hours_twelve)
    restaurant_three.business_hours.append(sun_hours_twelve)

    restaurant_three = Restaurant.query.get(13)
    restaurant_three.business_hours.append(monday_hours_thirteen)
    restaurant_three.business_hours.append(tues_hours_thirteen)
    restaurant_three.business_hours.append(wednes_hours_thirteen)
    restaurant_three.business_hours.append(thurs_hours_thirteen)
    restaurant_three.business_hours.append(fri_hours_thirteen)
    restaurant_three.business_hours.append(sat_hours_thirteen)
    restaurant_three.business_hours.append(sun_hours_thirteen)

    restaurant_three = Restaurant.query.get(14)
    restaurant_three.business_hours.append(monday_hours_fourteen)
    restaurant_three.business_hours.append(tues_hours_fourteen)
    restaurant_three.business_hours.append(wednes_hours_fourteen)
    restaurant_three.business_hours.append(thurs_hours_fourteen)
    restaurant_three.business_hours.append(fri_hours_fourteen)
    restaurant_three.business_hours.append(sat_hours_fourteen)
    restaurant_three.business_hours.append(sun_hours_fourteen)

    restaurant_three = Restaurant.query.get(15)
    restaurant_three.business_hours.append(monday_hours_fifteen)
    restaurant_three.business_hours.append(tues_hours_fifteen)
    restaurant_three.business_hours.append(wednes_hours_fifteen)
    restaurant_three.business_hours.append(thurs_hours_fifteen)
    restaurant_three.business_hours.append(fri_hours_fifteen)
    restaurant_three.business_hours.append(sat_hours_fifteen)
    restaurant_three.business_hours.append(sun_hours_fifteen)
   
    db.session.add(monday_hours)
    db.session.add(tues_hours)
    db.session.add(wednes_hours)
    db.session.add(thurs_hours)
    db.session.add(fri_hours)

    db.session.add(monday_hours_two)
    db.session.add(tues_hours_two)
    db.session.add(wednes_hours_two)
    db.session.add(thurs_hours_two)
    db.session.add(fri_hours_two)

    db.session.add(monday_hours_three)
    db.session.add(tues_hours_three)
    db.session.add(wednes_hours_three)
    db.session.add(thurs_hours_three)
    db.session.add(fri_hours_three)

    db.session.add(monday_hours_four)
    db.session.add(tues_hours_four)
    db.session.add(wednes_hours_four)
    db.session.add(thurs_hours_four)
    db.session.add(fri_hours_four)
    db.session.add(sat_hours_four)
    db.session.add(sun_hours_four)
   
    db.session.add(monday_hours_five)
    db.session.add(tues_hours_five)
    db.session.add(wednes_hours_five)
    db.session.add(thurs_hours_five)
    db.session.add(fri_hours_five)
    db.session.add(sat_hours_five)
    db.session.add(sun_hours_five)

    db.session.add(monday_hours_six)
    db.session.add(tues_hours_six)
    db.session.add(wednes_hours_six)
    db.session.add(thurs_hours_six)
    db.session.add(fri_hours_six)
    db.session.add(sat_hours_six)
    db.session.add(sun_hours_six)

    db.session.add(monday_hours_seven)
    db.session.add(tues_hours_seven)
    db.session.add(wednes_hours_seven)
    db.session.add(thurs_hours_seven)
    db.session.add(fri_hours_seven)
    db.session.add(sat_hours_seven)
    db.session.add(sun_hours_seven)

    db.session.add(monday_hours_eight)
    db.session.add(tues_hours_eight)
    db.session.add(wednes_hours_eight)
    db.session.add(thurs_hours_eight)
    db.session.add(fri_hours_eight)
    db.session.add(sat_hours_eight)
    db.session.add(sun_hours_eight)

    db.session.add(monday_hours_nine)
    db.session.add(tues_hours_nine)
    db.session.add(wednes_hours_nine)
    db.session.add(thurs_hours_nine)
    db.session.add(fri_hours_nine)

    db.session.add(monday_hours_ten)
    db.session.add(tues_hours_ten)
    db.session.add(wednes_hours_ten)
    db.session.add(thurs_hours_ten)
    db.session.add(fri_hours_ten)
    db.session.add(sat_hours_ten)
    db.session.add(sun_hours_ten)
    
    db.session.add(monday_hours_eleven)
    db.session.add(tues_hours_eleven)
    db.session.add(wednes_hours_eleven)
    db.session.add(thurs_hours_eleven)
    db.session.add(fri_hours_eleven)
    db.session.add(sat_hours_eleven)
    db.session.add(sun_hours_eleven)

    db.session.add(monday_hours_twelve)
    db.session.add(tues_hours_twelve)
    db.session.add(wednes_hours_twelve)
    db.session.add(thurs_hours_twelve)
    db.session.add(fri_hours_twelve)
    db.session.add(sat_hours_twelve)
    db.session.add(sun_hours_twelve)

    db.session.add(monday_hours_thirteen)
    db.session.add(tues_hours_thirteen)
    db.session.add(wednes_hours_thirteen)
    db.session.add(thurs_hours_thirteen)
    db.session.add(fri_hours_thirteen)
    db.session.add(sat_hours_thirteen)
    db.session.add(sun_hours_thirteen)

    db.session.add(monday_hours_fourteen)
    db.session.add(tues_hours_fourteen)
    db.session.add(wednes_hours_fourteen)
    db.session.add(thurs_hours_fourteen)
    db.session.add(fri_hours_fourteen)
    db.session.add(sat_hours_fourteen)
    db.session.add(sun_hours_fourteen)

    db.session.add(monday_hours_fifteen)
    db.session.add(tues_hours_fifteen)
    db.session.add(wednes_hours_fifteen)
    db.session.add(thurs_hours_fifteen)
    db.session.add(fri_hours_fifteen)
    db.session.add(sat_hours_fifteen)
    db.session.add(sun_hours_fifteen)

    db.session.commit()

def undo_business_hours():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.business_hours RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM business_hours"))
        
    db.session.commit()
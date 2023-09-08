from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, TextAreaField, IntegerField
from app.api.AWS_helpers import ALLOWED_EXTENSIONS
from wtforms.validators import DataRequired, Email, ValidationError

class NewRestaurantForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    restaurant_pic = FileField("Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    phone = StringField('phone', validators=[DataRequired()])
    street = StringField('street', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    zip_code = StringField('zip_code', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
    categories = StringField('categories', validators=[DataRequired()])
    description = TextAreaField('name', validators=[DataRequired()])
    avg_price = IntegerField('avg_price', validators=[DataRequired()])
    monday_open = StringField('monday_open')
    monday_close = StringField('monday_close')
    tuesday_open = StringField('tuesday_open')
    tuesday_close = StringField('tuesday_close')
    wednesday_open = StringField('wednesday_open')
    wednesday_close = StringField('wednesday_close')
    thursday_open = StringField('thursday_open')
    thursday_close = StringField('thursday_close')
    friday_open = StringField('friday_open')
    friday_close = StringField('friday_close')
    saturday_open = StringField('saturday_open')
    saturday_close = StringField('saturday_close')
    sunday_open = StringField('sunday_open')
    sunday_close = StringField('sunday_close')

    
    
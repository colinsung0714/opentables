from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, TextAreaField, IntegerField
from app.api.AWS_helpers import ALLOWED_EXTENSIONS
from wtforms.validators import DataRequired, Email, ValidationError

class NewReservationForm(FlaskForm):
    party = IntegerField('party', validators=[DataRequired()])
    reservation_date = StringField('reservation_date', validators=[DataRequired()])
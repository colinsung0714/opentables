from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, TextAreaField, IntegerField
from app.api.AWS_helpers import ALLOWED_EXTENSIONS
from wtforms.validators import DataRequired, Email, ValidationError

class NewReviewForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    restaurant_id = IntegerField('restaurant_id', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired()])
    comment = TextAreaField('comment', validators=[DataRequired()])
    review_images = FileField("Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
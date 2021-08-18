from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length


class PlaylistForm(FlaskForm):
    title = StringField("title", validators=[DataRequired(), Length(max=50)])
    description = StringField("description", validators=[Length(max=256)])

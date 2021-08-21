from wtforms.fields.core import IntegerField
from app.models.genre import Genre
from flask_wtf import FlaskForm
from wtforms import StringField, SelectMultipleField, FieldList, IntegerField, Field
from wtforms.validators import DataRequired, Length, ValidationError


class ListField(Field):
    def process_formdata(self, valuelist):
        self.data = valuelist


class SongForm(FlaskForm):
    album = StringField("album", validators=[Length(max=50)])
    albumImageUrl = StringField(
        "albumImageUrl", validators=[Length(max=500)])
    artist = StringField("artist", validators=[Length(max=50)])
    title = StringField("title", validators=[DataRequired(), Length(max=50)])
    songUrl = StringField("songUrl", validators=[
                          DataRequired(), Length(max=500)])
    genres = ListField()

    def validate_genres(self, field):
        db_genres = Genre.query.all()
        genre_choices = [genre.id for genre in db_genres]
        for genre_id in field.data:
            if genre_id not in genre_choices:
                raise ValidationError("No such genre")

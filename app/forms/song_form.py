from wtforms.fields.core import IntegerField
from app.models.genre import Genre
from flask_wtf import FlaskForm
from wtforms import StringField, SelectMultipleField, FieldList, IntegerField, Field
from wtforms.validators import DataRequired, Length, ValidationError


# def check_genre(form, field):
#     print("===============================")
#     print("form", form)
#     print("field", field)
#     db_genres = Genre.query.all()
#     genre_choices = [genre.id for genre in db_genres]
#     if field.data not in genre_choices:
#         raise ValidationError("No such genre")

class ListField(Field):
    def process_formdata(self, valuelist):
        self.data = valuelist


class SongForm(FlaskForm):
    album = StringField("album", validators=[Length(max=50)])
    albumImageUrl = StringField(
        "albumImageUrl", validators=[Length(max=500)])
    artist = StringField("artist", validators=[Length(max=50)])
    songUrl = StringField("songUrl", validators=[
                          DataRequired(), Length(max=500)])
    title = StringField("title", validators=[DataRequired(), Length(max=50)])
    # genres = SelectMultipleField("Genres", choices=genre_choices)
    genres = ListField()

    def validate_genres(self, field):
        print("===============================")
        # print("form", self)
        # print("field", field)
        db_genres = Genre.query.all()
        genre_choices = [genre.id for genre in db_genres]
        print(field.data)
        for genre_id in field.data:
            if genre_id not in genre_choices:
                raise ValidationError("No such genre")

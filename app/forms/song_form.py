from wtforms.fields.core import IntegerField
from app.models.genre import Genre
from flask_wtf import FlaskForm
from wtforms import StringField, SelectMultipleField, FieldList, IntegerField
from wtforms.validators import DataRequired, Length, ValidationError


# def check_genre(form, field):
#     print("===============================")
#     print("form", form)
#     print("field", field)
#     db_genres = Genre.query.all()
#     genre_choices = [genre.id for genre in db_genres]
#     if field.data not in genre_choices:
#         raise ValidationError("No such genre")


class SongForm(FlaskForm):
    album = StringField("album", validators=[Length(max=50)])
    albumImageUrl = StringField(
        "albumImageUrl", validators=[Length(max=500)])
    artist = StringField("artist", validators=[Length(max=50)])
    songUrl = StringField("songUrl", validators=[
                          DataRequired(), Length(max=500)])
    title = StringField("title", validators=[DataRequired(), Length(max=50)])
    # genres = SelectMultipleField("Genres", choices=genre_choices)
    genres = FieldList(IntegerField('genres'))

    def validate_genres(form, genres):
        print("===============================")
        print("form", form)
        print("field", genres)
        db_genres = Genre.query.all()
        genre_choices = [genre.id for genre in db_genres]
        print(genres.data)
        if genres.data not in genre_choices:
            raise ValidationError("No such genre")

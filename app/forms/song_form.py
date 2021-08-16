from app.models.genre import Genre
from flask_wtf import FlaskForm
from wtforms import StringField, SelectMultipleField, SubmitField
from wtforms.validators import DataRequired, Length

# db_genres = Genre.query.all()
# genre_choices = [(genre, genre.genreName) for genre in db_genres]


class SongForm(FlaskForm):
    album = StringField("Album", validators=[Length(max=50)])
    albumImageUrl = StringField(
        "Album Image Url", validators=[Length(max=500)])
    artist = StringField("Artist", validators=[Length(max=50)])
    songUrl = StringField("Song Url", validators=[
                          DataRequired(), Length(max=500)])
    title = StringField("Title", validators=[DataRequired(), Length(max=50)])
    # genres = SelectMultipleField("Genres", choices=genre_choices)
    submit = SubmitField("Upload Song")

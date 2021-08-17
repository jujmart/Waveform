from flask import Blueprint
from app.models import Genre

genre_routes = Blueprint('genres', __name__)


@genre_routes.route('/')
def get_all_genres():
    genres = Genre.query.all()

    genre_list = [genre.to_dict() for genre in genres]

    return {'genres': genre_list}


# @songs_routes.route('/<int:id>')
# def get_one_song(id):
#     song = Song.query.options(joinedload(Song.genres)).get(id)
#     song_dict = song.to_dict()
#     song_dict["genres"] = [genre.to_dict() for genre in song.genres]
#     return song_dict

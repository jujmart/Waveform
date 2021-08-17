from app.forms.song_form import SongForm
from flask import Blueprint, jsonify, render_template, request
from sqlalchemy.sql.functions import char_length
from flask_login import login_required, current_user
from app.models import Song, db, Genre
from sqlalchemy.orm import joinedload
import pprint

songs_routes = Blueprint('songs', __name__)


@songs_routes.route('/')
def get_all_songs():
    songs = Song.query.options(joinedload(Song.genres)).all()
    song_list = []
    for song in songs:
        song_dict = song.to_dict()
        song_dict["genres"] = [genre.to_dict() for genre in song.genres]
        song_list.append(song_dict)

    return {'songs': song_list}


@songs_routes.route('/<int:id>')
def get_one_song(id):
    song = Song.query.options(joinedload(Song.genres)).get(id)
    song_dict = song.to_dict()
    song_dict["genres"] = [genre.to_dict() for genre in song.genres]
    return song_dict


@songs_routes.route('/', methods=["POST"])
@login_required
def post_song():
    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print("GOTHEREGOTHEREGOTHEREGOTHERE")
        # new_song = Song()
        print("**************")
        print(form.data)
        # form.populate_obj(new_song)
        genre_list = [Genre.query.get(genre_id)
                      for genre_id in form.data["genres"]]
        new_song = Song(
            album=form.data["album"],
            albumImageUrl=form.data["albumImageUrl"],
            artist=form.data["artist"],
            songUrl=form.data["songUrl"],
            title=form.data["title"],
            genres=genre_list,
            userId=current_user.id
        )
        # print(new_song.genres)
        db.session.add(new_song)
        db.session.commit()
        new_song_data = new_song.to_dict()
        # new_song_data["genres"] = [genre.to_dict()
        #                            for genre in new_song.genres]
        return new_song_data
    print(form.errors)
    return form.errors

from app.forms.song_form import SongForm
from flask import Blueprint, jsonify, request
# from sqlalchemy.sql.functions import char_length
from flask_login import login_required, current_user
from app.models import Song, db, Genre
from sqlalchemy.orm import joinedload

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
        db.session.add(new_song)
        db.session.commit()
        # new_song_data = new_song.to_dict()
        # new_song_data["genres"] = [genre.to_dict()
        #                            for genre in new_song.genres]
        return  # new_song_data
    print(form.errors)
    return form.errors


@songs_routes.route('/<int:id>', methods=["PUT"])
@login_required
def put_song(id):
    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        genre_list = [Genre.query.get_or_404(genre_id)
                      for genre_id in form.data["genres"]]
        edited_song = Song.query.get_or_404(id)
        edited_song.album = form.data["album"]
        edited_song.albumImageUrl = form.data["albumImageUrl"]
        edited_song.artist = form.data["artist"]
        edited_song.songUrl = form.data["songUrl"]
        edited_song.title = form.data["title"]
        edited_song.genres = genre_list
        db.session.commit()
        # new_song_data = new_song.to_dict()
        # new_song_data["genres"] = [genre.to_dict()
        #                            for genre in new_song.genres]
        return edited_song.to_dict()
    print(form.errors)
    return form.errors

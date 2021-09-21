from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Playlist, Song, User, Genre
from sqlalchemy import func

search_routes = Blueprint('search', __name__)


@search_routes.route('/', methods=["PATCH"])
@login_required
def get_all_searches():
    search_param = request.get_json()
    search_input = search_param["searchInput"]
    if len(search_input) > 3:
        songs = Song.query.filter(
            Song.title.ilike(f'%{search_input}%')).limit(10)
        playlists = Playlist.query.filter(
            Playlist.title.ilike(f'%{search_input}%')).limit(10)
        users = User.query.filter(
            User.username.ilike(f'%{search_input}%')).limit(10)
        genres = Genre.query.filter(
            Genre.genreName.ilike(f'%{search_input}%')).limit(10)
    else:
        songs = Song.query.filter(
            func.lower(Song.title).startswith(search_input.lower())).limit(10)
        playlists = Playlist.query.filter(
            func.lower(Playlist.title).startswith(search_input.lower())).limit(10)
        users = User.query.filter(
            func.lower(User.username).startswith(search_input.lower())).limit(10)
        genres = Genre.query.filter(
            func.lower(Genre.genreName).startswith(search_input.lower())).limit(10)
    return {
        'songs': {song.id: song.to_dict() for song in songs},
        'playlists': {playlist.id: playlist.to_dict() for playlist in playlists},
        'users': {user.id: user.to_dict() for user in users},
        'genres': {genre.id: genre.to_dict() for genre in genres},
    }

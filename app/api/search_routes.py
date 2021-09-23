from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Playlist, Song, User
from sqlalchemy import func, or_

search_routes = Blueprint('search', __name__)


@search_routes.route('/', methods=["PATCH"])
@login_required
def get_all_searches():
    search_param = request.get_json()
    search_input = search_param["searchInput"]
    if len(search_input) > 3:
        songs = Song.query.filter(
            or_(Song.title.ilike(f'%{search_input}%'), Song.artist.ilike(f'%{search_input}%'), Song.album.ilike(f'%{search_input}%'))).limit(10)
        playlists = Playlist.query.filter(
            Playlist.title.ilike(f'%{search_input}%')).limit(10)
        users = User.query.filter(
            User.username.ilike(f'%{search_input}%')).limit(10)
    else:
        songs = Song.query.filter(
            or_(func.lower(Song.title).startswith(search_input.lower()), func.lower(Song.artist).startswith(search_input.lower()), func.lower(Song.album).startswith(search_input.lower()))).limit(10)
        playlists = Playlist.query.filter(
            func.lower(Playlist.title).startswith(search_input.lower())).limit(10)
        users = User.query.filter(
            func.lower(User.username).startswith(search_input.lower())).limit(10)

    playlistObjs = []
    for playlist in playlists:
        playlist_dict = playlist.to_dict()
        playlist_dict["songs"] = [song.id for song in playlist.songs]
        playlistObjs.append(playlist_dict)

    return {
        'songs': [song.id for song in songs],
        'playlists': [playlist.id for playlist in playlists],
        'users': [user.id for user in users],
        'songObjs': [song.to_dict() for song in songs],
        'playlistObjs': playlistObjs,
        'userObjs': [user.to_dict() for user in users],
    }

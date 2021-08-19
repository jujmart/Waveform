from app.forms.playlist_form import PlaylistForm
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Playlist
from sqlalchemy.orm import joinedload

playlists_routes = Blueprint('playlists', __name__)


@playlists_routes.route('/')
@login_required
def get_all_playlists():
    playlists = Playlist.query.options(joinedload(Playlist.songs)).all()
    playlists_list = []
    for playlist in playlists:
        playlist_dict = playlist.to_dict()
        playlist_dict["songs"] = [song.id for song in playlist.songs]
        playlists_list.append(playlist_dict)

    return {"playlists": playlists_list}


@playlists_routes.route('/<int:id>')
@login_required
def get_one_playlist(id):
    playlist = Playlist.query.options(joinedload(Playlist.songs)).get(id)
    playlist_dict = playlist.to_dict()
    playlist_dict["songs"] = [song.id for song in playlist.songs]
    return {"playlist": playlist_dict}


@playlists_routes.route('/', methods=["POST"])
@login_required
def post_playlist():
    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_playlist = Playlist(
            userId=current_user.id,
            title=form.data["title"],
            description=form.data["description"]
        )
        db.session.add(new_playlist)
        db.session.commit()
        new_playlist_dict = new_playlist.to_dict()
        new_playlist_dict["songs"] = []
        return {"playlist": new_playlist_dict}
    print(form.errors)
    return form.errors


@playlists_routes.route('/<int:id>', methods=["PUT"])
@login_required
def put_playlist(id):
    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        edited_playlist = Playlist.query.get_or_404(id)
        edited_playlist.title = form.data["title"]
        edited_playlist.description = form.data["description"]
        db.session.commit()
        edited_playlist_dict = edited_playlist.to_dict()
        edited_playlist_dict["songs"] = [song.id for song in edited_playlist.songs]
        return {"playlist": edited_playlist_dict}
    print(form.errors)
    return form.errors


@playlists_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_playlist(id):
    playlist = Playlist.query.get_or_404(id)
    db.session.delete(playlist)
    db.session.commit()
    return {}

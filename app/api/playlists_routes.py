from app.forms.playlist_form import PlaylistForm
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Playlist, Song
from sqlalchemy.orm import joinedload

playlists_routes = Blueprint('playlists', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field.title()} : {error}')
    return errorMessages


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
    if (playlist):
        playlist_dict = playlist.to_dict()
        playlist_dict["songs"] = [song.id for song in playlist.songs]
        return {"playlist": playlist_dict}
    return {"errors": "Playlist not found"}


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
    return {'errors': validation_errors_to_error_messages(form.errors)}


@playlists_routes.route('/<int:id>', methods=["PUT"])
@login_required
def put_playlist(id):
    form = PlaylistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        edited_playlist = Playlist.query.get_or_404(id)
        if edited_playlist.userId == current_user.id:
            edited_playlist.title = form.data["title"]
            edited_playlist.description = form.data["description"]
            db.session.commit()
            edited_playlist_dict = edited_playlist.to_dict()
            edited_playlist_dict["songs"] = [
                song.id for song in edited_playlist.songs]
            return {"playlist": edited_playlist_dict}
        return {"errors": "Only the creator of this playlist can edit it."}
    print(form.errors)
    return form.errors


@playlists_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_playlist(id):
    playlist = Playlist.query.get_or_404(id)
    if playlist.userId == current_user.id:
        db.session.delete(playlist)
        db.session.commit()
        return {'playlistId': playlist.id}
    return {"errors": "Only the creator of this playlist can delete it."}


@playlists_routes.route('/users/<int:id>')
def get_user_playlists(id):
    playlists = Playlist.query.filter(Playlist.userId == id).all()
    return {'playlists': [playlist.id for playlist in playlists]}


@playlists_routes.route('/', methods=['PATCH'])
@login_required
def get_playlists_from_playlist_arr():
    playlists_to_add = request.get_json()
    playlists = Playlist.query.filter(Playlist.id.in_(playlists_to_add)).all()
    playlists_list = []
    for playlist in playlists:
        playlists_dict = playlist.to_dict()
        playlists_dict["songs"] = [song.id for song in playlist.songs]
        playlists_list.append(playlists_dict)

    return {'playlists': playlists_list}


@playlists_routes.route('/addSong', methods=['POST'])
@login_required
def add_song_to_playlist():
    playlistId = request.get_json()['playlistId']
    songId = request.get_json()['songId']
    playlist = Playlist.query.get(playlistId)
    song = Song.query.get(songId)
    playlist.songs.append(song)
    db.session.commit()

    return {}


@playlists_routes.route('/<int:id>/users')
@login_required
def get_user_for_playlist(id):
    playlist = Playlist.query.get(id)
    user = playlist.user

    return {'user': user.to_dict()}


@playlists_routes.route('/get/<int:limit>')
@login_required
def get_playlists_for_a_limit(limit):
    playlists = Playlist.query.order_by(Playlist.createdAt.desc()).limit(limit)
    playlists_dict_list = []
    for playlist in playlists:
        playlist_dict = playlist.to_dict()
        playlist_dict['songs'] = [song.id for song in playlist.songs]
        playlists_dict_list.append(playlist_dict)

    return {'playlists': playlists_dict_list}


@playlists_routes.route('/removeSong', methods=['DELETE'])
@login_required
def delete_song_from_playlist():
    playlistId = request.get_json()['playlistId']
    songId = request.get_json()['songId']
    playlist = Playlist.query.get(playlistId)
    song = Song.query.get(songId)
    playlist.songs.remove(song)
    db.session.commit()

    return {}

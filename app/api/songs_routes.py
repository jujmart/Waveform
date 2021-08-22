from app.forms.song_form import SongForm
from flask import Blueprint, jsonify, request
# from sqlalchemy.sql.functions import char_length
from flask_login import login_required, current_user
from app.models import Song, db, Genre
from sqlalchemy.orm import joinedload
from app.AWS import allowed_file, get_unique_filename, upload_file_to_s3, delete_file_by_url

songs_routes = Blueprint('songs', __name__)


@songs_routes.route('/')
def get_all_songs():
    songs = Song.query.options(joinedload(Song.genres)).order_by(Song.createdAt.desc()).limit(5)
    song_list = []
    for song in songs:
        song_dict = song.to_dict()
        song_dict["genres"] = [genre.genreName for genre in song.genres]
        song_list.append(song_dict)

    return {'songs': song_list}


@songs_routes.route('/<int:id>')
def get_one_song(id):
    song = Song.query.options(joinedload(Song.genres)).get(id)
    song_dict = song.to_dict()
    song_dict["genres"] = [genre.genreName for genre in song.genres]
    return {'song': song_dict}


@songs_routes.route("/AWS/<int:id>", methods=['POST'])
@login_required
def post_song_url(id):
    # for song upload
    if "file" not in request.files:
        return {"errors": "song required"}, 400

    song = request.files['file']

    if not allowed_file(song.filename):
        return {"errors": "file type not permitted"}, 400

    song.filename = get_unique_filename(song.filename)

    songUpload = upload_file_to_s3(song)

    if "url" not in songUpload:
        return songUpload, 400

    songUrl = songUpload["url"]

    song_to_update = Song.query.get_or_404(id)
    song_to_update.songUrl = songUrl
    db.session.commit()

    # for Album image upload
    if "image" not in request.files:
        return {"errors": "album image required"}, 400

    albumImage = request.files['image']

    if not allowed_file(albumImage.filename):
        return {"errors": "file type not permitted"}, 400

    albumImage.filename = get_unique_filename(albumImage.filename)

    albumImageUpload = upload_file_to_s3(albumImage)

    if "url" not in albumImageUpload:
        return albumImageUpload, 400

    albumImageUrl = albumImageUpload["url"]

    song_to_update.albumImageUrl = albumImageUrl
    db.session.commit()

    return {"songUrl": songUrl, "albumImageUrl": albumImageUrl}


@songs_routes.route('/', methods=["POST"])
@login_required
def post_song():
    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        genre_list = Genre.query.filter(
            Genre.id.in_(form.data["genres"])).all()
        new_song = Song(
            album=form.data["album"],
            albumImageUrl=form.data["albumImageUrl"],
            artist=form.data["artist"],
            songUrl=form.data['songUrl'],
            title=form.data["title"],
            genres=genre_list,
            userId=current_user.id
        )
        db.session.add(new_song)
        db.session.commit()
        return {"songId": new_song.id}
    print(form.errors)
    return form.errors


@songs_routes.route("/AWS/<int:id>", methods=['PUT'])
def put_song_aws(id):

    # for Album image upload
    if "image" not in request.files:
        return {"errors": "album image required"}, 400

    albumImage = request.files['image']

    if not allowed_file(albumImage.filename):
        return {"errors": "file type not permitted"}, 400

    albumImage.filename = get_unique_filename(albumImage.filename)

    song_to_update = Song.query.get_or_404(id)
    old_album_image_url = song_to_update.albumImageUrl
    delete_file_by_url(old_album_image_url)
    albumImageUpload = upload_file_to_s3(albumImage)

    if "url" not in albumImageUpload:
        return albumImageUpload, 400

    albumImageUrl = albumImageUpload["url"]

    song_to_update.albumImageUrl = albumImageUrl
    db.session.commit()

    return {"albumImageUrl": albumImageUrl}


@songs_routes.route('/<int:id>', methods=["PUT"])
@login_required
def put_song(id):
    form = SongForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        edited_song = Song.query.get_or_404(id)
        if edited_song.userId == current_user.id:
            genre_list = Genre.query.filter(
                Genre.id.in_(form.data["genres"])).all()
            edited_song.album = form.data["album"]
            edited_song.artist = form.data["artist"]
            edited_song.title = form.data["title"]
            edited_song.genres = genre_list
            db.session.commit()
            # new_song_data = new_song.to_dict()
            # new_song_data["genres"] = [genre.to_dict()
            #                            for genre in new_song.genres]
        return {}
    print(form.errors)
    return form.errors


@songs_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_song(id):
    song = Song.query.get_or_404(id)
    if song.userId == current_user.id:
        old_album_image_url = song.albumImageUrl
        old_song_url = song.songUrl
        delete_file_by_url(old_album_image_url)
        delete_file_by_url(old_song_url)
        db.session.delete(song)
        db.session.commit()
    return {}


@songs_routes.route('/playlist', methods=['PATCH'])
@login_required
def get_songs_for_playlist():
    songs_to_add = request.get_json()
    songs = Song.query.filter(Song.id.in_(songs_to_add)).all()
    song_list = []
    for song in songs:
        song_dict = song.to_dict()
        song_dict["genres"] = [genre.genreName for genre in song.genres]
        song_list.append(song_dict)

    return {'songs': song_list}


@songs_routes.route('/users/<int:id>')
def get_user_songs(id):
    songs = Song.query.filter(Song.userId == id).all()
    return {'songs': [song.id for song in songs]}

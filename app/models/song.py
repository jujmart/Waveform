from .playlist import playlist_songs
from .db import db
from sqlalchemy.sql import func
from .genre import song_genres


class Song(db.Model):
    __tablename__ = 'songs'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    songUrl = db.Column(db.String(500), nullable=False)
    artist = db.Column(db.String(50), nullable=False, default="Unknown", index=True)
    album = db.Column(db.String(50), nullable=False, default="Unknown", index=True)
    albumImageUrl = db.Column(db.String(
        500), nullable=False, default="https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Album-Images/Seeder1-NoAlbumImage.jpeg")
    title = db.Column(db.String(50), nullable=False, index=True)
    createdAt = db.Column(db.DateTime(timezone=True),
                          nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True),
                          nullable=False, server_default=func.now(), onupdate=func.now())

    user = db.relationship("User", back_populates="songs")
    genres = db.relationship("Genre", secondary=song_genres, back_populates="songs")
    playlists = db.relationship("Playlist", secondary=playlist_songs, back_populates="songs")


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'songUrl': self.songUrl,
            'artist': self.artist,
            'album': self.album,
            'albumImageUrl': self.albumImageUrl,
            'title': self.title,
            'createdAt': self.createdAt
        }

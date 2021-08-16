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
        500), nullable=False, default="https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Flouisville.edu%2Fhistory%2Fimages%2Fnoimage.jpg%2Fimage&sp=1629065288T7c044d67e521f94df641487ea71e795fce2fea038ff67db102476246d62e49a4")  # will add this photo to AWS and update this url to the created AWS url
    title = db.Column(db.String(50), nullable=False, index=True)
    createdAt = db.Column(db.DateTime(timezone=True),
                          nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True),
                          nullable=False, server_default=func.now(), onupdate=func.now())

    user = db.relationship("User", back_populates="songs")
    genres = db.relationship("Genre", secondary=song_genres, back_populates="songs")


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

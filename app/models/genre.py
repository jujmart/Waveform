from .db import db
from sqlalchemy.sql import func



song_genres = db.Table('song-genres',
    db.Column('genreId', db.ForeignKey('genres.id'), primary_key=True),
    db.Column('songId', db.ForeignKey('songs.id'), primary_key=True)
)

class Genre(db.Model):
    __tablename__ = 'genres'

    id = db.Column(db.Integer, primary_key=True)
    genreName = db.Column(db.String(25), nullable=False, unique=True)
    createdAt = db.Column(db.DateTime(timezone=True),
                          nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True),
                          nullable=False, server_default=func.now(), onupdate=func.now())

    songs = db.relationship("Song", secondary=song_genres, back_populates="genres")

    def to_dict(self):
        return {
            'id': self.id,
            'genreName': self.genreName,
        }

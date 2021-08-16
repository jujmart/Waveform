from .db import db
from sqlalchemy.sql import func


class Playlist(db.Model, Base):
    __tablename__ = 'playlists'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(50), index=True, nullable=False)
    description = db.Column(db.String(256))
    createdAt = db.Column(db.DateTime(timezone=True),
                          nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True),
                          nullable=False, server_default=func.now(), onupdate=func.now())

    user = db.relationship("User", back_populates="playlists")
    # genres = db.relationship("Genre", secondary=song_genres, back_populates="songs")


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'title': self.title,
            'description': self.description,
            'createdAt': self.createdAt
        }

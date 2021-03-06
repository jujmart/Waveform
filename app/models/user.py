from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func


follow = db.Table('follows',
                  db.Column('user_a_id', db.Integer, db.ForeignKey(
                      'users.id'), primary_key=True),
                  db.Column('user_b_id', db.Integer, db.ForeignKey(
                      'users.id'), primary_key=True),
                  db.UniqueConstraint(
                      'user_a_id', 'user_b_id', name='unique_follows')
                  )


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), nullable=False, unique=True)
    email = db.Column(db.String(256), nullable=False, unique=True)
    hashedPassword = db.Column(db.String(255), nullable=False)
    profilePhotoUrl = db.Column(db.String(
        500), nullable=False, default="https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Profile-Photos/Seeder1-BlankPhoto.png")
    createdAt = db.Column(db.DateTime(timezone=True),
                          nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime(timezone=True),
                          nullable=False, server_default=func.now(), onupdate=func.now())

    followers = db.relationship("User", secondary=follow,
                                primaryjoin=id == follow.c.user_a_id,
                                secondaryjoin=id == follow.c.user_b_id
                                )

    songs = db.relationship("Song", back_populates="user")
    playlists = db.relationship("Playlist", back_populates="user")

    @property
    def password(self):
        return self.hashedPassword

    @password.setter
    def password(self, password):
        self.hashedPassword = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profilePhotoUrl': self.profilePhotoUrl,
            'follows': [follower.id for follower in self.followers],
            "songIds": [song.id for song in self.songs],
            "playlistIds": [playlist.id for playlist in self.playlists],
            'createdAt': self.createdAt,
        }

    def to_dict_short(self):
        return {
            'id': self.id,
            'username': self.username,
            'profilePhotoUrl': self.profilePhotoUrl,
        }

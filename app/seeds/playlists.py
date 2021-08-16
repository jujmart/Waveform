from alembic import op
from app.models import db, Playlist
from app.models.playlist import playlist_songs

def seed_playlists():
    demo = Playlist(
        userId=1 , title='title goes here', description='Description')


    db.session.add(demo)

    db.session.commit()
    # op.bulk_insert(playlist_songs,
    #                [
    #                    {'playlistId':1, 'songId':1}
    #                ])



# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_playlists():
    db.session.execute('TRUNCATE playlists RESTART IDENTITY CASCADE;')
    db.session.commit()

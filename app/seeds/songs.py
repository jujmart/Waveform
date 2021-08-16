from app.models import db, Song

make_way = Song(
    userId=1, songUrl='https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Songs/Make+Way+For+The+King.mp3', artist='Ohana Bam', title='Make Way for the King')


def seed_songs():

    db.session.add(make_way)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_songs():
    db.session.execute('TRUNCATE songs RESTART IDENTITY CASCADE;')
    db.session.commit()

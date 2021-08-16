from app.models import db, Genre


def seed_genres():
    genre_list = [
        'Rock', 'Rap', 'Hip-Hop',
        'Electronic', 'Metal',
        'Americana', 'Alternative Rock',
        'R & B', 'Chill', 'Focus'
    ]

    for genre in genre_list:
        db.session.add(Genre(genreName=genre))

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_genres():
    db.session.execute('TRUNCATE genres RESTART IDENTITY CASCADE;')
    db.session.commit()

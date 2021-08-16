from app.models import db, Genre
from .songs import make_way


def seed_genres():
    genre_list = [
        'Rock', 'Rap', 'Hip-Hop',
        'Electronic', 'Metal',
        'Americana', 'Alternative Rock',
        'R & B', 'Chill', 'Focus'
    ]

    genre_dict = {key: Genre(genreName=key) for key in genre_list}

    for genre in genre_dict.values():
        db.session.add(genre)

    genre_dict['Rap'].songs.append(make_way)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_genres():
    db.session.execute('TRUNCATE genres RESTART IDENTITY CASCADE;')
    db.session.commit()

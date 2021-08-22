from app.models import db, Genre
from .songs import make_way, acting_up, burning, ddu_ddu, dont_look_back, great_one, i_wish_i_cared, in_the_dirt, keeping_your_head_up, must_be_nice, nice_for_what, overnight, perfect_memory, perfect_strangers, prophets, she_knows, sky_full_of_stars, sunflower, too_high, truth_hurts, z


def seed_genres():
    genre_list = [
        'Rock', 'Rap', 'Hip-Hop', 'K-pop',
        'Electronic', 'Metal', 'Pop',
        'Americana', 'Alternative Rock',
        'R & B', 'Chill', 'Focus'
    ]

    genre_dict = {key: Genre(genreName=key) for key in genre_list}

    for genre in genre_dict.values():
        db.session.add(genre)

    genre_dict['Rap'].songs.append(make_way)
    genre_dict['Rap'].songs.append(acting_up)
    genre_dict['Hip-Hop'].songs.append(acting_up)
    genre_dict['Alternative Rock'].songs.append(burning)
    genre_dict['K-pop'].songs.append(ddu_ddu)
    genre_dict['Chill'].songs.append(dont_look_back)
    genre_dict['R & B'].songs.append(great_one)
    genre_dict['Pop'].songs.append(i_wish_i_cared)
    genre_dict['Alternative Rock'].songs.append(in_the_dirt)
    genre_dict['Alternative Rock'].songs.append(keeping_your_head_up)
    genre_dict['Rap'].songs.append(must_be_nice)
    genre_dict['Hip-Hop'].songs.append(must_be_nice)
    genre_dict['Hip-Hop'].songs.append(nice_for_what)
    genre_dict['Alternative Rock'].songs.append(overnight)
    genre_dict['Alternative Rock'].songs.append(perfect_memory)
    genre_dict['Electronic'].songs.append(perfect_strangers)
    genre_dict['Alternative Rock'].songs.append(prophets)
    genre_dict['Rap'].songs.append(she_knows)
    genre_dict['Alternative Rock'].songs.append(sky_full_of_stars)
    genre_dict['Rock'].songs.append(sky_full_of_stars)
    genre_dict['Hip-Hop'].songs.append(sunflower)
    genre_dict['Rap'].songs.append(too_high)
    genre_dict['Hip-Hop'].songs.append(truth_hurts)
    genre_dict['Chill'].songs.append(z)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_genres():
    db.session.execute('TRUNCATE genres RESTART IDENTITY CASCADE;')
    db.session.commit()

from app.models import db, Playlist
from .songs import make_way, acting_up, burning, ddu_ddu, dont_look_back, great_one, i_wish_i_cared, in_the_dirt, keeping_your_head_up, must_be_nice, nice_for_what, overnight, perfect_memory, perfect_strangers, prophets, she_knows, sky_full_of_stars, sunflower, too_high, truth_hurts, z


def seed_playlists():
    playlist1 = Playlist(
        userId=1, title='Demo User Playlist 1', description='These songs touched my heart')

    rap_songs = Playlist(
        userId=1, title='Rap Songs', description='Favorite Rappers')

    alternative_songs = Playlist(
        userId=1, title='Alternative Songs', description='Songs that get me in a mood')

    marnies_playlist = Playlist(
        userId=2, title="Marnie's Playlist", description='Songs I like!')

    other_cool_songs = Playlist(
        userId=3, title='Other Cool Songs', description='Some other cool songs that you might not have heard of')

    best_songs = Playlist(
        userId=4, title='Best Songs', description='These songs cannot be beaten')

    rock_on = Playlist(
        userId=5, title='Rock On', description='ROCK ON!!!!!!!!!!')

    random_songs = Playlist(
        userId=2, title='Random Songs', description='Random-ish Songs')

    chill = Playlist(
        userId=3, title='Chill', description='Chill to these on a sunny saturday filled with nothing to do')

    what = Playlist(
        userId=4, title='What?', description='Can you repeat that?')

    get_a_pump = Playlist(
        userId=1, title='Get A Pump', description='Listen to these when you are at the gym getting a pump')

    haha = Playlist(
        userId=1, title='Hahahaha', description='Funny Songs')

    playlist_list = [playlist1, rap_songs, alternative_songs, marnies_playlist, other_cool_songs,
                     best_songs, rock_on, random_songs, chill, what, get_a_pump, haha]

    for playlist in playlist_list:
        db.session.add(playlist)

    playlist1.songs.extend([make_way, acting_up, burning, ddu_ddu,
                           dont_look_back, great_one, i_wish_i_cared, in_the_dirt])
    rap_songs.songs.extend(
        [make_way, acting_up, must_be_nice, she_knows, too_high])
    alternative_songs.songs.extend(
        [burning, in_the_dirt, keeping_your_head_up, overnight, perfect_memory, prophets, sky_full_of_stars])
    marnies_playlist.songs.extend([truth_hurts, sunflower, perfect_strangers])
    other_cool_songs.songs.extend(
        [ddu_ddu, i_wish_i_cared, keeping_your_head_up, dont_look_back])
    best_songs.songs.extend([make_way, in_the_dirt, overnight, sunflower])
    rock_on.songs.extend([burning, in_the_dirt, keeping_your_head_up,
                         overnight, perfect_memory, prophets, sky_full_of_stars, i_wish_i_cared])
    random_songs.songs.extend([too_high, great_one, overnight, perfect_memory])
    chill.songs.extend([z, dont_look_back])
    what.songs.extend([ddu_ddu, nice_for_what])
    get_a_pump.songs.extend([make_way, she_knows, sunflower, truth_hurts])
    haha.songs.extend([too_high])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_playlists():
    db.session.execute('TRUNCATE playlists RESTART IDENTITY CASCADE;')
    db.session.commit()

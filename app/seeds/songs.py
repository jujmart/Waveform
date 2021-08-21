from app.models import db, Song

make_way = Song(
    userId=1,
    songUrl='https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Songs/Make+Way+For+The+King.mp3',
    artist='Ohana Bam',
    title='Make Way for the King',
    albumImageUrl="https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Album-Images/Make-Way-For-the-King_album.jpg",
)
acting_up = Song(
    userId=1,
    songUrl='https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Songs/G-Eazy+-+Acting+Up+ft+Devon+Baldwin.mp3',
    artist='G-Eazy',
    title='Acting Up',
    albumImageUrl="https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Album-Images/Acting-Up_album.jpeg",
    album="The Endless Summer"
)
burning = Song(
    userId=1,
    songUrl='https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Songs/Maggie+Rogers+-+Burning+(Audio).mp3',
    artist='Maggie Rogers',
    title='Burning',
    albumImageUrl="https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Album-Images/Burning_album.jpeg",
    album="Heard It in a Past Life"
)
ddu_ddu = Song(
    userId=2,
    songUrl='https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Songs/BLACKPINK+-+%EB%9A%9C%EB%91%90%EB%9A%9C%EB%91%90+(DDU-DU+DDU-DU)+MV.mp3',
    artist='Black Pink',
    title='Ddu-ddu Ddu-ddu',
    albumImageUrl="https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Album-Images/Ddu-Du-Ddu-Du_album.png",
    album="Square Up"
)
dont_look_back = Song(
    userId=3,
    songUrl="https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Songs/Kotomi+%26+Ryan+Elder+-+Don't+Look+Back+(Rick+and+Morty+Season+4+Finale+Song).mp3",
    artist="Rick and Morty featuring Kotomi & Ryan Elder",
    title="Don't Look Back",
    albumImageUrl="https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Album-Images/Dont-Look-Back_album.png"
)
great_one = Song(
    userId=4,
    songUrl='https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Songs/Jessie+Reyez+-+Great+One+(Official+Video).mp3',
    artist='Jessie Reyez',
    title='Great One',
    albumImageUrl="https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Album-Images/Great-One_album.jpg",
    album="Kiddo"
)
i_wish_i_cared = Song(
    userId=5,
    songUrl='https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Songs/a-ha+-+I+Wish+I+Cared.mp3',
    artist='a-ha',
    title='I Wish I Cared',
    albumImageUrl="https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Album-Images/I-Wish-I-Cared_album.jpg",
    album="Minor Earth Major Sky"
)
in_the_dirt = Song(
    userId=1,
    songUrl='https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Songs/S.+Carey+-+In+The+Dirt+(Official+Video).mp3',
    artist='S. Carey',
    title='In The Dirt',
    albumImageUrl="https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Album-Images/In-The-Dirt_album.jpeg",
    album="All We Grow"
)
keeping_your_head_up = Song(
    userId=2,
    songUrl='https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Songs/Birdy+-+Keeping+Your+Head+Up+%5BOfficial%5D.mp3',
    artist='Birdy',
    title='Keeping Your Head Up',
    albumImageUrl="https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Album-Images/Keeping-Your-Head-Up_album.jpeg"
)
must_be_nice = Song(
    userId=3,
    songUrl='https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Songs/G-Eazy+-+Must+Be+Nice+(Music+Video).mp3',
    artist='G-Eazy',
    title='Must Be Nice',
    albumImageUrl="https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Album-Images/Must-Be-Nice_album.jpeg"
)
nice_for_what = Song(
    userId=4,
    songUrl='https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Songs/Drake+-+Nice+For+What.mp3',
    artist='Drake',
    title='Nice For What',
    albumImageUrl="https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Album-Images/Nice-for-What_album.jpeg"
)
overnight = Song(
    userId=5,
    songUrl='https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Songs/Maggie+Rogers+-+Overnight+(Official+Audio).mp3',
    artist='Maggie Rogers',
    title='Overnight',
    albumImageUrl="https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Album-Images/Overnight_album.jpeg"
)
perfect_memory = Song(
    userId=1,
    songUrl='https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Songs/Remy+Zero+-+Perfect+Memory+(The+Invisible).mp3',
    artist='Remy Zero',
    title='Perfect Memory',
    albumImageUrl="https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Album-Images/Perfect-Memory_album.jpg"
)
perfect_strangers = Song(
    userId=2,
    songUrl='https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Songs/Jonas+Blue+-+Perfect+Strangers+ft.+JP+Cooper+(Official+Video).mp3',
    artist='Jonas Blue',
    title='Perfect Strangers',
    albumImageUrl="https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Album-Images/Perfect-Strangers_album.jpeg"
)
prophets = Song(
    userId=3,
    songUrl='https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Songs/A.C.+Newman+-+Prophets+(How+I+Met+Your+Mother+-+4x24).mp3',
    artist='A.C. Newman',
    title='Prophets',
    albumImageUrl="https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Album-Images/Prophets_album.jpeg"
)
she_knows = Song(
    userId=4,
    songUrl='https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Songs/J.+Cole+-+She+Knows+ft.+Amber+Coffman%2C+Cults+(Explicit+Video).mp3',
    artist='J. Cole featuring Amber Coffman',
    title='She Knows',
    albumImageUrl="https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Album-Images/She-Knows_album.jpeg"
)
sky_full_of_stars = Song(
    userId=5,
    songUrl='https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Songs/Coldplay+-+A+Sky+Full+Of+Stars+(Official+Video).mp3',
    artist='Coldplay',
    title='A Sky Full Of Stars',
    albumImageUrl="https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Album-Images/Sky-Full-of-Stars_album.png"
)
sunflower = Song(
    userId=2,
    songUrl='https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Songs/Post+Malone%2C+Swae+Lee+-+Sunflower+(Spider-Man+Into+the+Spider-Verse).mp3',
    artist='Post Malone & Swae Lee',
    title='Sunflower',
    albumImageUrl="https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Album-Images/Sunflower_album.jpeg"
)
too_high = Song(
    userId=3,
    songUrl='https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Songs/Lil+Dicky+-+Too+High+(Official+Video).mp3',
    artist='Lil Dicky',
    title='Too High',
    albumImageUrl="https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Album-Images/Too-High_album.jpeg"
)
truth_hurts = Song(
    userId=4,
    songUrl='https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Songs/Lizzo+-+Truth+Hurts+(Official+Video).mp3',
    artist='Lizzo',
    title='Truth Hurts',
    albumImageUrl="https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Album-Images/Truth-Hurts_album.jpeg"
)
z = Song(
    userId=5,
    songUrl='https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Songs/Catching+Flies+-+Z+(Official+Audio).mp3',
    artist='Catching Flies',
    title='Z',
    albumImageUrl="https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Album-Images/Z_album.jpeg"
)


def seed_songs():
    song_list = [make_way, acting_up, burning, ddu_ddu, dont_look_back, great_one, i_wish_i_cared, in_the_dirt, keeping_your_head_up, must_be_nice,
                 nice_for_what, overnight, perfect_memory, perfect_strangers, prophets, she_knows, sky_full_of_stars, sunflower, too_high, truth_hurts, z]
    for song in song_list:
        db.session.add(song)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_songs():
    db.session.execute('TRUNCATE songs RESTART IDENTITY CASCADE;')
    db.session.commit()

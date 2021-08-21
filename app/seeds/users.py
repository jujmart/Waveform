from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='pazzword', profilePhotoUrl="https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Profile-Photos/Marnie_profile.jpeg")
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='pazzword', profilePhotoUrl="https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Profile-Photos/Bobbie_profile.jpeg")
    copacetic_chica = User(
        username='copacetic_chica', email='copacetic_chica@aa.io', password='pazzword', profilePhotoUrl="https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Profile-Photos/Woman1_profile.jpeg")
    thomas = User(
        username='thomas', email='thomas@aa.io', password='pazzword', profilePhotoUrl="https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Profile-Photos/Man1_profile.jpeg")

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(copacetic_chica)
    db.session.add(thomas)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

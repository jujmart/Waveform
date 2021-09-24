from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User
from flask_login import current_user

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/limit/<int:limit>')
@login_required
def get_users_by_limit(limit):
    users = User.query.order_by(User.createdAt.desc()).limit(limit)
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/add-follower', methods=['POST'])
def add_follower():
    follower_id = request.get_json()['id']
    follower = User.query.get(follower_id)
    user = User.query.get(current_user.id)

    if follower.id not in user.to_dict()['follows']:
        user.followers.append(follower)
        db.session.commit()
        return {'success': "I love you -Gir"}
    else:
        return {'error': ['You are already friends.']}


@user_routes.route('/delete-follower', methods=['POST'])
def delete_follower():
    follower_id = request.get_json()['id']
    follower = User.query.get(follower_id)
    user = User.query.get(current_user.id)

    if follower.id in user.to_dict()['follows']:
        user.followers.remove(follower)
        db.session.commit()
        return {'success': "I love you -Gir"}
    else:
        return {'error': ['You were not already friends.']}

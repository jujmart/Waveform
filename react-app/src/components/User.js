import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./css/user-profile-page.css";

function User() {
	const [user, setUser] = useState({});
	const { userId } = useParams();
	const [currentUserProfile, setCurrentUserProfile] = useState(false);

	useEffect(() => {
		if (!userId) {
			return;
		}
		(async () => {
			const response = await fetch(`/api/users/${userId}`);
			const user = await response.json();
			setUser(user);
		})();
	}, [userId]);

	const currentUser = useSelector((state) => state.session.user);

	useEffect(() => {
		currentUser.id === user.id
			? setCurrentUserProfile(true)
			: setCurrentUserProfile(false);
	}, [user]);

	if (!user) {
		return null;
	}

	return (
		<div id="user-profile-container_div">
			{/* Simple user display at top of page */}
			<div id="user-profile-info_div">
				<img
					src={user.profilePhotoUrl}
					className="user_profile-img"
					alt="User Profile Image"
				/>
				<p id="user-profile-profile_p">PROFILE</p>
				<h1 id="user-profile-username_h1">{user.username}</h1>
				{/* <h3>{user.id}</h3> */}
				<p id="user-profile-count_p">
					# of created playlists ⚬ # of added songs ⚬ # of followers
				</p>
			</div>

			{/* follow button */}

			<div>
				<button>FOLLOW</button>
			</div>

			{/* List of user created playlists */}
			<div>
				<h2>
					{currentUserProfile
						? "Your playlists"
						: `${user.username}'s playlists`}
				</h2>
				<div>
					<img src="" alt="playlist image" />
					<h3>Playlist Name</h3>
				</div>
			</div>

			{/* List of the users most recently added songs */}

			<div>
				<h2>
					{currentUserProfile
						? "Your most recently added songs"
						: `${user.username}'s most recently added songs`}
				</h2>
				<div>
					<h4>name of song</h4>
					<p>album name</p>
					<p>date added</p>
					<p>length of song</p>
				</div>
			</div>
		</div>
	);
}
export default User;

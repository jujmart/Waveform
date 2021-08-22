import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getASingleUserThunk } from "../store/session";
import { setPlaylistSongsThunk } from "../store/songs";
import "./css/user-profile-page.css";
import Song from "./Song";

function User() {
	const [profileUser, setProfileUser] = useState({});
	const [songIdsNotInState, setSongIdsNotInState] = useState([]);
	const { userId } = useParams();
	const [currentUserProfile, setCurrentUserProfile] = useState(false);
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.session.user);
	const songs = useSelector((state) => state.songs);
	const history = useHistory();

	useEffect(() => {
		(async () => {
			const user = await dispatch(getASingleUserThunk(userId));
			setProfileUser(user);
		})();
	}, [userId, dispatch]);

	useEffect(() => {
		currentUser.id === profileUser.id
			? setCurrentUserProfile(true)
			: setCurrentUserProfile(false);
	}, [profileUser, currentUser]);

	useEffect(() => {
		if (profileUser?.songIds) {
			profileUser.songIds.forEach((songId) => {
				if (!songs[songId]) {
					setSongIdsNotInState((prevState) => [...prevState, songId]);
				}
			});
		}
	}, [profileUser, songs]);

	useEffect(() => {
		if (songIdsNotInState.length) {
			dispatch(setPlaylistSongsThunk(songIdsNotInState));
		}
	}, [dispatch, songIdsNotInState]);

	if (!Object.keys(profileUser).length) {
		return null;
	}

	return (
		<div id="user-profile-container_div">
			{/* Simple user display at top of page */}
			<div id="user-profile-info_div">
				<img
					src={profileUser.profilePhotoUrl}
					className="user_profile-img"
					alt="User Profile Img"
				/>
				<p id="user-profile-profile_p">PROFILE</p>
				<h1 id="user-profile-username_h1">{profileUser.username}</h1>
				{/* <h3>{user.id}</h3> */}
				<p id="user-profile-count_p">
					# of created playlists ⚬ # of added songs
				</p>
			</div>

			{/* follow button */}

			{/* <div>
				<button>FOLLOW</button>
			</div> */}

			{/* List of user created playlists */}
			<div>
				<h2>
					{currentUserProfile
						? "Your playlists"
						: `${profileUser.username}'s playlists`}
				</h2>
				<div>
					<img src="" alt="playlist img" />
					<h3>Playlist Name</h3>
				</div>
			</div>

			{/* List of the users most recently added songs */}

			<div>
				<h2>
					{currentUserProfile
						? "Your most recently added songs"
						: `${profileUser.username}'s most recently added songs`}
				</h2>
				<div>
					{profileUser.songIds.map((songId) => (
						<div key={songId}>
							<Song songId={songId} />
							{currentUserProfile && (
								<>
									<button
										onClick={() =>
											history.push(
												`/edit-song-form/${songId}`
											)
										}
									>
										Edit Song
									</button>
									<button>Delete Song</button>
								</>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
export default User;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUserPlaylistsThunk } from "../store/userMusicInfo";
import { getOnePlaylistThunk } from "../store/playlist";
import LogoutButton from "./auth/LogoutButton";
import PlaylistFormModal from "./PlaylistForm";

import { login } from "../store/session";
import { populatePlaylistFromArrThunk } from "../store/playlist";
import "./css/nav-bar.css";

const NavBar = () => {
	const [errors, setErrors] = useState([]);

	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const [playlistIdsNotInStore, setPlaylistIdsNotInStore] = useState([]);
	const userPlaylistsIdArr = useSelector(
		(state) => state.userMusicInfo.playlists
	);
	const playlists = useSelector((state) => state.playlists);

	const demoUserLogin = async (e) => {
		e.preventDefault();
		const data = await dispatch(login("demo@aa.io", "password"));
		if (data) {
			setErrors(data);
		}
	};

	useEffect(() => {
		dispatch(getUserPlaylistsThunk(user?.id));
	}, [dispatch, user]);

	useEffect(() => {
		userPlaylistsIdArr.forEach((playlistId) => {
			if (!playlists[playlistId]) {
				setPlaylistIdsNotInStore((prevState) => [
					...prevState,
					playlistId,
				]);
			}
		});
	}, [userPlaylistsIdArr, playlists]);

	useEffect(() => {
		if (playlistIdsNotInStore.length) {
			dispatch(populatePlaylistFromArrThunk(playlistIdsNotInStore));
		}
	}, [playlistIdsNotInStore, dispatch]);

	if (user) {
		return (
			<nav id="nav-bar_nav">
				{/* UPPER NAV BAR */}
				<div id="upper-nav-bar_div">
					<div id="upper-nav-bar-button_div">
						<button>Back</button>
						<button>Forward</button>
					</div>
					<div id="user_div">
						<img
							id="nav-bar_current-user-img"
							src="data:image/jpeg;base64,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"
							alt="Current user img"
						/>
						<p>{user.username}</p>
						<div id="user-drop-down_div">
							<NavLink to={`/users/${user.id}`}>Profile</NavLink>
							<LogoutButton />
						</div>
					</div>
				</div>

				{/* LEFT SIDE NAV BAR */}
				<div id="left-nav-bar_div">
					<NavLink
						to="/"
						id="settings-nav-bar_nav-link"
						exact={true}
						activeClassName="active"
					>
						⚬ ⚬ ⚬
					</NavLink>

					<NavLink
						to="/"
						className="nav-bar_nav-links"
						exact={true}
						activeClassName="active"
					>
						Home
					</NavLink>

					<NavLink
						to="/"
						className="nav-bar_nav-links"
						exact={true}
						activeClassName="active"
					>
						Search
					</NavLink>

					<NavLink
						to="/"
						className="nav-bar_nav-links"
						exact={true}
						activeClassName="active"
					>
						Liked Songs
					</NavLink>

					<NavLink
						to="/song-form"
						className="nav-bar_nav-links"
						exact={true}
						activeClassName="active"
					>
						Song Form
					</NavLink>

					<PlaylistFormModal />
				</div>
				<div id="user-playlists-nav-bar_div">
					<NavLink to={`/playlists/1`} className="user-playlist">
						Playlist one
					</NavLink>
					<NavLink to={`/playlists/2`} className="user-playlist">
						Playlist two
					</NavLink>
					<NavLink to={`/playlists/3`} className="user-playlist">
						Playlist three
					</NavLink>
				</div>

				{/* RIGHT SIDE NAV BAR */}

				<div id="right-nav-bar_div">
					<h3 id="friend-activity_h3">Friend Activity</h3>
					<div>
						<img
							className="friend-activity_profile-img"
							src="https://imgix.ranker.com/user_node_img/50045/1000889229/original/1-photo-u1?auto=format&q=60&fit=crop&fm=pjpg&w=375"
							alt="Friend Img"
						/>
						<p>Most recent SONG</p>
						<p>Most recent SONG album name</p>
						<p>Most recently created Playlist</p>
					</div>
					<div>
						<img
							className="friend-activity_profile-img"
							src=""
							alt="Friend Img"
						/>
						<p>Most recent SONG</p>
						<p>Most recent SONG album name</p>
						<p>Most recently created Playlist</p>
					</div>
					<div>
						<img
							className="friend-activity_profile-img"
							src=""
							alt="Friend Img"
						/>
						<p>Most recent SONG</p>
						<p>Most recent SONG album name</p>
						<p>Most recently created Playlist</p>
					</div>
					<div>
						<img
							className="friend-activity_profile-img"
							src=""
							alt="Friend Img"
						/>
						<p>Most recent SONG</p>
						<p>Most recent SONG album name</p>
						<p>Most recently created Playlist</p>
					</div>
				</div>

				{/* MUSIC PLAYER NAVBAR */}
				<div id="audio-controls-nav-bar_div">
					<div id="song-display_div">
						<img
							id="audio-controls_img"
							src="data:image/jpeg;base64,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"
							alt="album img"
						/>
						<p id="audio-controls_name">Song Name</p>
						<p id="audio-controls_album-title">Album Title</p>
					</div>

					<div id="audio-controls_div">
						<button id="audio-controls_back">Skip Back</button>
						<button id="audio-controls_skip">Skip Song</button>
						<button id="audio-controls_play">Play Pause</button>
						<button id="audio-controls_queue">Show Queue</button>
						<button id="audio-control_fullscreen">
							Fullscreen
						</button>
						<p id="audio-control_volume">Volume Slider</p>
					</div>
				</div>

				{/* WAVEFORM */}
				{/* <div id='waveform-nav-bar_div'>
      <h2>MOVING WAVEFROM THING</h2>
    </div> */}
			</nav>
		);
	}

	return (
		<nav id="nav-bar-lo_nav">
			<img
				id="nav-bar-logo_img"
				src="data:image/png;base64,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"
				alt="Image logo"
			/>
			<NavLink
				id="nav-bar-lo_login"
				className="nav-bar-lo_link"
				to="/login"
				exact={true}
				activeClassName="active"
			>
				Login
			</NavLink>
			<NavLink
				id="nav-bar-lo_signup"
				className="nav-bar-lo_link"
				to="/sign-up"
				exact={true}
				activeClassName="active"
			>
				Signup
			</NavLink>
			<button id="nav-bar-lo_demo-btn" onClick={demoUserLogin}>
				DEMO
			</button>
		</nav>
	);
};

export default NavBar;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { getUserPlaylistsThunk } from "../store/userMusicInfo";
import LogoutButton from "./auth/LogoutButton";
import PlaylistFormModal from "./PlaylistForm";

import { login } from "../store/session";
import { populatePlaylistFromArrThunk } from "../store/playlist";
import "./css/nav-bar.css";
import { getAllUsersThunk } from "../store/users";

const NavBar = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const [playlistIdsNotInStore, setPlaylistIdsNotInStore] = useState([]);
	const userPlaylistsIdArr = useSelector(
		(state) => state.userMusicInfo.playlists
	);
	const playlists = useSelector((state) => state.playlists);
	const users = useSelector((state) => state.users);

	const demoUserLogin = async (e) => {
		e.preventDefault();
		await dispatch(login("demo@aa.io", "password"));
	};

	useEffect(() => {
		if (user) {
			dispatch(getUserPlaylistsThunk(user?.id));
		}
	}, [dispatch, user]);

	useEffect(() => {
		if (user) {
			dispatch(getAllUsersThunk(50));
		}
	}, [dispatch, user]);

	useEffect(() => {
		if (user) {
			userPlaylistsIdArr.forEach((playlistId) => {
				if (!playlists[playlistId]) {
					setPlaylistIdsNotInStore((prevState) => [
						...prevState,
						playlistId,
					]);
				}
			});
		}
	}, [userPlaylistsIdArr, playlists, user]);

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
					<div id="upper-nav-bar-button_div"></div>
					<div id="drop-down-super-container">
						<img
							id="nav-bar_current-user-img"
							src={user.profilePhotoUrl}
							alt="Current user img"
						/>

						<div className="user-dropdown">
							<p id="user-dropdown_p">
								{user.username}{" "}
								<span className="material-icons">
									arrow_drop_down
								</span>
							</p>
							<div className="user-dropdown-content">
								<ul id="user-dropdown_ul">
									<li>
										<NavLink
											id="dropdown-profil_nav"
											to={`/users/${user.id}`}
										>
											Profile
										</NavLink>
									</li>
									<li>
										<LogoutButton />
									</li>
								</ul>
							</div>
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
						...
					</NavLink>

					<NavLink
						to="/"
						className="nav-bar_nav-links"
						exact={true}
						activeClassName="active-upper-navlinks"
					>
						<span className="material-icons">home&nbsp;&nbsp;</span>
						Home
					</NavLink>

					<NavLink
						to={`/users/${user.id}`}
						className="nav-bar_nav-links"
						exact={true}
						activeClassName="active-upper-navlinks"
					>
						<span className="material-icons">
							person&nbsp;&nbsp;
						</span>
						Profile
					</NavLink>

					<NavLink
						to="/"
						className="nav-bar_nav-links"
						exact={true}
						activeClassName="active-upper-navlinks"
					></NavLink>

					<NavLink
						to="/song-form"
						className="nav-bar_nav-links"
						exact={true}
						activeClassName="active-upper-navlinks"
					>
						<span className="material-icons">
							audiotrack&nbsp;&nbsp;
						</span>
						Add Song
					</NavLink>
					<PlaylistFormModal />

					<hr id="hr"></hr>
				</div>

				<div id="user-playlists-nav-bar_div">
					{Object.keys(playlists) &&
						userPlaylistsIdArr.map((playlistId) => (
							<div
								className="user-playlists-nav-bar_div_li"
								key={playlistId}
							>
								<div className="user-playlists-nav-bar_li">
									<NavLink
										to={`/playlists/${playlistId}`}
										className="user-playlist"
									>
										{playlists[playlistId]?.title}
									</NavLink>
								</div>
							</div>
						))}
				</div>

				{/* RIGHT SIDE NAV BAR */}

				<div id="song-activity_h3-container">
					<h3 id="song-activity_h3">Newest Users</h3>
				</div>

				<div id="right-nav-bar_div">
					<div id="shhhhh">
						<p>if you found this you're awfully nosey</p>
					</div>
					{users.map((user) => (
						<div
							key={user.id}
							className="newest-song-container_div"
						>
							<img
								className="song-activity-album_img"
								src={user.profilePhotoUrl}
								alt="Friend Img"
							/>
							<p className="song-activity-song_p">
								<Link to={`/users/${user.id}`}>
									{user.username}
								</Link>
							</p>
							<p className="song-activity-album_p">
								Joined On:{" "}
								{user.createdAt
									?.split(" ")
									.splice(1, 3)
									.join(" ")}
							</p>
						</div>
					))}
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
				alt="Img logo"
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

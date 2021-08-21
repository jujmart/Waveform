import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUserPlaylistsThunk } from "../store/userMusicInfo";
import LogoutButton from "./auth/LogoutButton";
import PlaylistFormModal from "./PlaylistForm";

import { login } from "../store/session";
import { populatePlaylistFromArrThunk } from "../store/playlist";

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
			<nav>
				{/* UPPER NAV BAR */}
				<div>
					<p>{user.username}</p>
					<img src="" alt="Current user img" />
					<ul>
						<li>
							<NavLink to={`/users/${user.id}`}>Profile</NavLink>
						</li>
						<li>
							<NavLink to={`/users/2`}>Profile</NavLink>
						</li>
						<LogoutButton />
					</ul>
				</div>

				{/* LEFT SIDE NAV BAR */}
				<div>
					<NavLink to="/" exact={true} activeClassName="active">
						⚬ ⚬ ⚬ settings
					</NavLink>
					<ul>
						<li>
							<NavLink
								to="/"
								exact={true}
								activeClassName="active"
							>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/"
								exact={true}
								activeClassName="active"
							>
								Search
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/"
								exact={true}
								activeClassName="active"
							>
								Liked Songs
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/song-form"
								exact={true}
								activeClassName="active"
							>
								Song Form
							</NavLink>
						</li>
						<li>
							<PlaylistFormModal />
						</li>
					</ul>
				</div>
				<p>=====================SIMPLE DIVIDER PLZ KILL ME</p>

				{/* RIGHT SIDE NAV BAR */}

				<div>
					<p>Friend Activity</p>
					<div>
						<img src="" alt="Friend Img" />
						<p>Most recent SONG</p>
						<p>Most recent SONG album name</p>
						<p>Most recently created Playlist</p>
					</div>
					{/* <div>
          <img src='' alt='Friend Img' />
          <p>Most recent SONG</p>
          <p>Most recent SONG album name</p>
          <p>Most recently created Playlist</p>
        </div>
        <div>
          <img src='' alt='Friend Img' />
          <p>Most recent SONG</p>
          <p>Most recent SONG album name</p>
          <p>Most recently created Playlist</p>
        </div>
        <div>
          <img src='' alt='Friend Img' />
          <p>Most recent SONG</p>
          <p>Most recent SONG album name</p>
          <p>Most recently created Playlist</p>
        </div> */}
				</div>

				{/* These links only for developement
    remove before deploying */}

				<div>
					<ul>
						<li>
							<NavLink
								to="/edit-song-form/1"
								exact={true}
								activeClassName="active"
							>
								Edit Song 1 Form
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/login"
								exact={true}
								activeClassName="active"
							>
								Login
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/playlists/1"
								exact={true}
								activeClassName="active"
							>
								Playlist 1
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/users"
								exact={true}
								activeClassName="active"
							>
								Users
							</NavLink>
						</li>
					</ul>
				</div>

				<p>=====================SIMPLE DIVIDER PLZ KILL ME</p>

				{/* MUSIC PLAYER NAVBAR */}
				<div>
					<img src="" alt="album img" />
					<p>Song Name</p>
					<p>Album Title</p>
					<button>Skip Back</button>
					<button>Skip Song</button>
					<button>Play Pause</button>
					<button>Show Queue</button>
					<button>Fullscreen</button>
					<p>Volume Slider</p>
					<audio controls={true} />
				</div>

				<p>=====================SIMPLE DIVIDER PLZ KILL ME</p>
				{/* WAVEFORM */}
				<div>
					<h2>MOVING WAVEFROM THING</h2>
				</div>
			</nav>
		);
	}

	return (
		<nav>
			<div>
				<img src="" alt="Image logo" />
			</div>
			<div>
				<ul>
					<li>
						<NavLink
							to="/login"
							exact={true}
							activeClassName="active"
						>
							Login
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/sign-up"
							exact={true}
							activeClassName="active"
						>
							Signup
						</NavLink>
					</li>
					<li>
						<button onClick={demoUserLogin}>DEMO</button>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default NavBar;

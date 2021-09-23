import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { getUserPlaylistsThunk } from "../store/userMusicInfo";
import LogoutButton from "./auth/LogoutButton";
import PlaylistFormModal from "./PlaylistForm";

// import mp3 from "../components/Songs/Tyler The Creator - JUGGERNAUT (Lyrics) ft. Lil Uzi Vert & Pharrell Williams.mp3";
import shadeLogo from "./WAVE OUTLINE.png";

import { login } from "../store/session";
import { populatePlaylistFromArrThunk } from "../store/playlist";
import "./css/nav-bar.css";
import { getAllUsersThunk } from "../store/users";
import { moveToNextSong } from "../store/songQueue";

const NavBar = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const [playlistIdsNotInStore, setPlaylistIdsNotInStore] = useState([]);
	const userPlaylistsIdArr = useSelector(
		(state) => state.userMusicInfo.playlists
	);
	const playlists = useSelector((state) => state.playlists);
    const users = useSelector((state) => state.users);

    const [mp3, setMp3] = useState("");
    const [buffer, setBuffer] = useState(false);

	const songQueue = useSelector((state) => state.songQueue);
	const songs = useSelector((state) => state.songs);

	useEffect(() => {
		if (songQueue.length) {
			setMp3(songs[songQueue[0]]?.songUrl);
		}
	}, [songQueue, songs]);

	useEffect(() => {
		// console.log("nex Song should play here");
		if (songs[songQueue[0]]?.songUrl) {
			let music = document.querySelector("audio");
			music
				.play()
				.then(() => {
					// console.log("working");
				})
				.catch((e) => {
					// console.log("error");
				});
		}
	}, [mp3]); //needs to have react warning or will get errors (either way it still functions the same)

	const demoUserLogin = async (e) => {
		e.preventDefault();
		await dispatch(login("demo@aa.io", "password"));
	};

	useEffect(() => {
		if (user) {
			dispatch(getUserPlaylistsThunk(user?.id));
		}
	}, [dispatch, user]);

	// useEffect(() => {
	// 	if (user) {
	// 		dispatch(getAllUsersThunk(50));
	// 	}
	// }, [dispatch, user]);

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

	const bufferFunc = () => {
		setMp3(
			"https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Songs/500-milliseconds-of-silence.mp3"
		);
		setBuffer(true);
	};

	// const updateQueueHead = () => {
	// 	dispatch(moveToNextSong());
	// };

	useEffect(() => {
		if (buffer) {
			dispatch(moveToNextSong());
			setBuffer(false);
		}
	}, [buffer]);

	if (user) {
		return (
			<nav id="nav-bar_nav">
				{/* UPPER NAV BAR */}
				<div id="upper-nav-bar_div">
					<NavLink to="/" exact={true}>
						<img
							id="shadeLogo-logged-in"
							src={shadeLogo}
							alt="Img logo"
						/>
					</NavLink>
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
									{/* <li>
										<NavLink
											id="dropdown-profil_nav"
											to={`/users/${user.id}`}
										>
											Profile
										</NavLink>
									</li> */}
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
						to="/search"
						className="nav-bar_nav-links"
						exact={true}
						activeClassName="active-upper-navlinks"
					>
						<span className="material-icons">
							search&nbsp;&nbsp;
						</span>
						Search
					</NavLink>

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
										activeClassName="user-playlist-active"
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
					{/* {users.map((user) => (
						<Link to={`/users/${user.id}`} key={user.id}>
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
									{user.username}
								</p>
								<p className="song-activity-album_p">
									Joined On:{" "}
									{user.createdAt
										?.split(" ")
										.splice(1, 3)
										.join(" ")}
								</p>
							</div>
						</Link>
					))} */}
				</div>

				{/* MUSIC PLAYER NAVBAR */}
				<div id="audio-controls-nav-bar_div">
					<div id="song-display_div">
						{songQueue.length ? (
							<img
								id="audio-controls_img"
								src={songs[songQueue[0]].albumImageUrl}
								alt="album img"
							/>
						) : (
							<img
								id="audio-controls_img"
								src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBEREREODhERDg4ODg4ODhAODhEODg4QFxMYGBcTFxcbICwlGx02KxcXJTYlKS4wMzMzGiU/PjkyPSwyMzABCwsLEA4QGhISFzIgISkyMjAyMjMyMjIwMDUyMjIyMjQyMjIyNDIyMjIyMjAzMjQwMDIwMDAyMjIyMjIyMDIwMv/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAADAQEBAQEAAAAAAAAAAAAAAQIDBAUGB//EADgQAAICAgEDAgQFAQYGAwAAAAECAAMREgQFITETQQYiUWEUMnGBkaEjQlKCsdEHYnKio8EzQ5L/xAAaAQADAQEBAQAAAAAAAAAAAAAAAQIDBAUG/8QALxEAAgIBAgMHBAEFAQAAAAAAAAECEQMSIQQxQVFhgZGhsfAiMnHB0QVScuHxFP/aAAwDAQACEQMRAD8A/KIQjmogijhGAQhCOhBCEIxBCEI6AIRxRiCEIQAIQhAAhHFALCEISRhCEIAEIQgAQhCIoIQhEAQhCABCEICCEIRpBYQhHGIUcUI6EOEIR0KwhFCMVjhCEAsIRQjoLHCKEQWEI4QHYRRwiaHYoRxSRhCEIh2EDCETAIQhAYQhCMkIQxHKoQRRwjoVhCEJSJsIQhHQBCEIAEI4QEKEcUBhCOKABCEIqAUccUQWEIQgUhQhCS0MIQhEMIQhFRQRwhKSM7FHCEoQo4QjoQRwhKEEIYjxABQxCPEAFiGJUICJxDEqEAJxCOEBihFHABQjiiGEIQiAIQhEUmKEcUljCEIRDCOEJZAQhCOhBCOGIxWEcQE6eBxmtuqpQbNZai49sZ9/tFOShFyfQcVqaSEdVXXUGxgCWJ/KPOAPr4mM7uscI0XemzBi6eq2Aw1LH8pBAwcY7fecWJGCanBST5/PIeaOmbj2ChiViPE2MyYS8QxACIS8QxADPEWJpiLEBE4ixKIiIgMWIoyIoh2KEcIhihHEYmMIo4SWUhQhCTQwjjimiICOEAIxNjAjgBHKJsQE+p+E+NoLOZYPl0C1ErspPujYPybZVQ2VA28z5/jKnqILg3phwLAg+fHvjx3n1nIvReO7cUNa4RWR+M7XLqCe11bAMvn/AAkfoTmeXx2bUljjyv583fcd3C49P1s8D4g5Pq8hvm3WoCsNljsx+ewjYk42YjyfH3nnAQXH1HufPvKGPqP5no4cWiEYroceSeqTYtYYl4jxNaIsjEMS8R4gFmeIYmmIsQDURiIia11s7KijZnZVUDyWJwBOvqfSeRxX9PlUvS+qvhx21Pg7DI/rE2k6bGrZ5usRE1xERChGREkiakSCIATJMsiSRJoYoQxCKihQhCSxhFHCBVjhCAEozsYE6eHwrbm0pQ2t/hUjP9TM6k2IHzfU6ruQMgZx+4/metxk9Jz+HHIfVkdnbjelfXj3GHbA9x3zOfiOIWNUvu8a8/8AZthwPJu1sMfCnUcqPwd+X7LhM574/b95hb08049bVm3et6g2zLjyDjwezR8nrDs2fV5D7E5J5FlbDB9yDhved3T+Mrekx/8AsvestkM5D1Ftjn7gicebi5qP1bfPNHTi4eDe25zcZMubbDs7M+fsde5/XJlcvjlGS6smpz6ZBQkFCSO4Ptg/SfR2cHh8dNrr82Nq2i4tY4xnsD2zieHZzXuYiqoqisC25y/5iQMe5PcAD6fuOLHkeR6o8u/Zep1NKK0s7enfFfOUalONyEVRk8rjJZqqgADIIOAAO07K+sc3kJZ6fTOnEFtWccZ/zkf3S1mM/wBBPlgjWD01yGZi5VdmOMEahVyT5/0n0PSfh3n30p+GbQJazBWUgqwVcnOM4wR28ZBl5XGC3pX2p/oUYt9H7FpwuS1hVuncO7tsfQrvQd027Orlfvj6jE25nQLivqL0XRXC6mvm3Y7jswUk+e318fecdvE61SVSqyy2sEMp4/zUlsdlUgd2+gHebVczrRXG/pKiDvYAmMDIUAkH6fpiJZcsFcZpr/KSE4Qlzj6J/s60+GaiG9Tgcutgu2KeZXa4B7DK2IMd/uZ85z+j3Vvp6HJUHJUXUfPj7lMqf2M97ldK62BtaEzWy/Or1+ogbAAOGOAe3n6faca8Hqnz+tbYinGXs5LrhTn5cKcEftLx8Xmg7llX4bb8uvsZz4bHJbRfgkv3+j5tkIJBGCOxB8gxYnXy+PocbpYe+dGyAQcefeYBZ9BCSnFSX7XvueLK4tp/z7GNoOMjOQcgj2xP0Dh8O1+Fx7udYl1XUAlY5T3WLbwGP/xizvhqyAvfHYkZ9p81wuIDVy3YKV4/GI+c4U2YLY+57Dt5n0XxLx25jcDhUMFpduPx01P5da1Ukr/mJ/ieDnzrNkqtrrwrp4er7j2MWJwhu+l+J8j1XpqUZ15VNtithhWCUYBe2pH5vYfuJ5bpao2as67Bc6kYY7YH/a38GfqnL+Gk5XNp4Vtrv05eM7cMq9bWB07WJ6oXZs9zgmY9W+ATUrPw+TZYq+orU8nV9RXSbgob3BCgePeGDjLX0ttdvT4uu3sKeFN7o/OKqSwJIZMKz/NW5BVThjkDtg+ZF1ZQ4bHnHb6+cfUH7ECffv0Hl0vTvV6ofmK+VUsj0tVi5QfoQC2PqD+s8lul8nA9TjWMtnErpRiCHcjlBePae2QcYT7jP6TZf1JLnJeOxH/kXQ+S0J9j7e318R2UOn51Ze+MMMHP6T7zgcpa0qrt4dloou5SBzT6wfilMlGwPy7dx4IHiZ2/GxPHp4g4FN7ioKHvrNjOjEldTjOMFRnPtKjx85corb52/nyE+DS6s+Np6XfYM1I1n/R3P8TidCpKkYKsVYHyGBwRPY4vU7KLA9aU0sh2VcOMn7hDk+57n3MnrV9l7fiuRaLbbQoUKqDCDOFwGyPB8jM3w8RKUtMkt+Xzf52meXAoq4nkQjIkzsMBQlQk0MYEYEYEYEozPX+GesPwuUnIrrF51et6mAYOjYyP1yFP7T2+udTPNzyDd+G5CFteOyqlSL5xvWMk9gAGzjE+f6NzV49osemvkLo6NXepas7Y74BHcYE9O3iNza35q010cbiKlFgperjoT3Yao2SbCG/TsPOJ5XHxayqTVR/u258qp/8ATv4WUdLj1PJoRw3apOTZdkqFsABzknxieivReY/pj8OvHNtoqpPrE5Yqx18nthSc/wC89D4b690njfO3FvFwA0d3S+w/XwAF9v8Aae43x9Xa1XpcUgUWespssVMkIyY/8k4ck+JcmsWLz/hSr50OnVjUfql7e9X7HzXC+EOZeqOLKxx7CMs+2wXPdguv/v2nt8mvjcSscfj9O5djWKEHJy5uftgnTBUA5I1PsD47To4fxXaiLTVx9q6qL6lFd6s+QoIsP1IwfHnJnu8L4jrJX1EsoHpUhDbVa2Q1h1yQMbar5+p+05+InxCbU1a6Lx25e5eOUG7xvf52+x0/AXR24wuus4ooawf2ZtdH51jElsYX5UXAAAHk5zPL+POdyuIouqwWHLCMLUR2NTKSi4x3BIJ+s9videquD/hWVrELAKX7lRYV2x/lJxPh/wDiB1y9uQvFCV/2NdbO5GzFmGWwc+PH8maYZPPOMHHk2+d+nPqZZHoTlfz2Pnl+JOeGB9UqLHrYhakUB0J1OMdsY/ftN7PiHmuCrcq4qy6sNhgrjGP6zitud/zsW75+2ZlrPo8XB44L6oRb/CPEzcXKb2bS/J1t1XksNTfYQAoxufCrqo/YdpzW2u353Lf9TEiLWPWdMccIfbFL8KjCWWUubsyxKBA+ZuwHcy9YnTIx+h/cHMMkdUWu1MeOajJN9Gj6/kcN6uncelCDd1a+utkBO3cgsD2wV7gH9PeexXWU6hxKlYsKfSrXwe4DsxDnyc1jA/XzPmuhc3flJfYyVGigivGwBc4Usg74fUnx5P1n0HSuZQOW4tBqCcflMg5GpBTSlVzlfmPew+D4M+RljljzJZOatvbt6+S2rt27vpIyWSFwdp7IR5IN711/I9Ja5yxRVFn99vl7LnGCCFz58nJ+kr6o34fJqBQ06oyMW2aykVV9/OcByfefn/UesWepbZb6tVd+9NJspYMKQQQoXAbJBA/zdxjuPAXrN9Vm3Ea4LlgGPy2DtqT37e5+4z5mfDcNlcbxvTsvnLpy8+1mmSUV93Q/ZOm9THK5HHQN6acY2kJju7H+zQ9/+Xbt/wA0fVeo0WKblbUtxenWr4/IeblSP/wcifmfF+Iq/Tf16WW9ax+Gu4rFTuPexSe/t3H+Hx9fCfqFuV0cqq9gHIYqozov7ZJ/Uzqx8LxLUoNPftvbZdfW+110Rzyy4E1JS9j9J+Jepcd2zxSQz/jq7ytYTLqVRX+4z3/TP1nlN092ANdeCtXHp+ZgpJ0Vde33z9sT4teoXjy+3YZ2UMCd9z7fUD9p6nC+K+RXncUWBrfWJNI332ZvrjX5j2x9PpFk/pnELeEVfp06X3b7lw43CklqOTqNem2a2xgFN20Gc/Nn7fcZmy28dOFYHqqbkW1uitso9H8uCB52yAe/nv3M+q43/EWtgV5COo01AqSlVBx7DQkfzPz3qNyvYxrDrUO1avYbCq/qfGe5wOwzid3D8PlbSnFxre+3u337/DfoYZ+IjT0u72OEiSRNCJJE9Y84iErEIDsoCWBBRNAJVEgBLBONcnUkErk6kj3I8ZiAlASiHKhBB9B/AlgRhZYWUlRjKQlyO4yP0OJ0VcqxO6O6nsezEeM4/wBT/MyCygsbSez3M9dcjrr6jcCDlWIGAbKlc4yT5Iz7k/vMb7nsYvYdmOAT9h4GPaSBKCyI4YRepRSfckE805KnJtdluiAsYWaBYwk1oy1GeI9ZrrDWFE6jLWGs11hrCg1GIEh0Zm39RxhgygOcKQP7v09v4nQUklZnPFGf3KzXHmlj3i6Isdmbd2axz5ex2ssP6s2SZkRNisRWVGKjtFUDyOXN2YkSCJsRIZYDUjIiQRNisgiI0UjIiSRNCJJElo2jIyYTMibkTMiSzQzxCXCIDUCUBGBLCyzKUhASwI1WWqy0YykILLCxhZoqxmTkSqSgspVmgWOjNyICygssLKCxkORAWPWaBY9YE2Z6x4mmsesCdRjrDWbaxawHqMcQKzXWIrAdmJWQVmxWSVgUpGDLIKzoKzNliNFIwYSCJuwkFYjRSMWEzIm5WQwkmkWYkSWE1IkESTaMjLWOXiOKjSzVVlqstUmipNKOJyIVZarLVZapKozciFWaBZYSWEjMnIgLKCzQJLCwIcjMLKCywsoLAjUZ6x6zTWPWBOozxDE11hrAWoyxFrNtYisAsx1iIm2sRWA9RjiQVm5WSRAvUc5WSVnQVmZWBopHOVkFZ0lJmyQLUjnYTMrOhlkMsk1UjnIkETdlkMsVGkZGOITTWEmi9R3LVNVrmqpNFSanBKZitc0WuaqksJAyczIJKFc2CSgsDNzMgkoJNQkoLAhzMhXGFmwWMLAnWY6x6TXWPWAtRlrDWa4hrAWoy0i0m2sMQHqOcrFpOgiLEB6jnKSSk6CskrApSOYpJKzoKySsC1I5mSQUnUVkFYGimcjJM2rnYVmbJA0UzjZZBSdbLM2WKjVTObSE21hFReo9FVlhZapLCyjz3IgLLCygssCBm5EgSgJQWUFgRqJAjCywsYECNRAEYE0Cx6xiszxHrL1j1gKzOE01i1gGoz1hiaYigOzMiIiaFZJWA0zPEkia6xFYFWZFZDCbFZBWIpMyKyCs1KySsDRMwYSWE2KyCsDRMwImbLOgrIKwNFIwxCa6QgXqPRCzQLLVJoK46POczIJKCTYJKCR0ZuZiFlBZqK5QrhROsyCx6zbWMJHROsx1gFm+kNIULWY6wxNtI9YUGoxxFibaw1hQtRjiPSa6wKQHqMNYik30iKQoeo5ysWk6CkkrCh6jApIKToKxFYqKUjmKSCs6SskpFRopHKVkMk6ikgpEWpHKUmbJOspIKQNFM5dITo1hAvWeispYQlHCzQQEISiChKWEIEjEIQgSxyhCECQhCEACAhCABCEIASYjCEBoDFCECkSZDRwgUQ0kwhJLRMiOERaMmkNHCI0REIQgaH//2Q=="
								alt="album img"
							/>
						)}
						{songQueue.length ? (
							<p id="audio-controls_name">
								{songs[songQueue[0]].title}
							</p>
						) : (
							<p id="audio-controls_name">Song Title</p>
						)}
						{songQueue.length ? (
							<p id="audio-controls_album-title">
								{songs[songQueue[0]].artist}
							</p>
						) : (
							<p id="audio-controls_album-title">Artist</p>
						)}
					</div>

					<div id="audio-controls_div">
						<audio
							// controls
							// autoplay
							id="navbar-player"
							controls={true}
							src={mp3}
							accept={`*/`}
							onEnded={bufferFunc}
							// onPlay={() => setIsPlaying(true)}
							// onPause={() => setIsPlaying(false)}
						></audio>
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
			<NavLink to="/" exact={true}>
				<img id="shadeLogo" src={shadeLogo} alt="Img logo" />
			</NavLink>
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

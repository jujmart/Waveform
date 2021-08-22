import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSongsThunk } from "../../store/songs";
import Song from "../../components/Song";

const HomePageLoggedIn = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const songs = useSelector((state) => state.songs);

	useEffect(() => {
		dispatch(getAllSongsThunk());
	}, [dispatch]);

	return (
		<div id='homepage-LI-container_div'>
			{Object.keys(songs).length && (
				<Song songId={Object.keys(songs)[0]} />
			)}
			{/* Current Users Playlist divider */}
			<div>
				<h2>{user.username} Playlists</h2>
				<div>
					<p>Name of playlist</p>
					<img src="" alt="Album Image" />
					<button>Stuff</button>
				</div>
				<div>
					<p>Name of playlist</p>
					<img src="" alt="Album Image" />
					<button>Stuff</button>
				</div>
				<div>
					<p>Name of playlist</p>
					<img src="" alt="Album Image" />
					<button>Stuff</button>
				</div>
				<div>
					<p>Name of playlist</p>
					<img src="" alt="Album Image" />
					<button>Stuff</button>
				</div>
				<div>
					<p>Name of playlist</p>
					<img src="" alt="Album Image" />
					<button>Stuff</button>
				</div>
			</div>

			{/* Recently Added Songs Divider */}
			<div>
				<h2>Recently Added Songs</h2>
				<div>
					<p>Name of Song</p>
					<img src="" alt="Album Image" />
					<button>Stuff</button>
				</div>
				<div>
					<p>Name of Song</p>
					<img src="" alt="Album Image" />
					<button>Stuff</button>
				</div>
				<div>
					<p>Name of Song</p>
					<img src="" alt="Album Image" />
					<button>Stuff</button>
				</div>
				<div>
					<p>Name of Song</p>
					<img src="" alt="Album Image" />
					<button>Stuff</button>
				</div>
				<div>
					<p>Name of Song</p>
					<img src="" alt="Album Image" />
					<button>Stuff</button>
				</div>
				<div>
					<p>Name of Song</p>
					<img src="" alt="Album Image" />
					<button>Stuff</button>
				</div>
			</div>

			{/* Checkout Other Playlists Divider */}
			<div>
				<h2> Playlists</h2>
				<div>
					<p>Name of playlist</p>
					<img src="" alt="Album Image" />
					<button>Stuff</button>
				</div>
				<div>
					<p>Name of playlist</p>
					<img src="" alt="Album Image" />
					<button>Stuff</button>
				</div>
				<div>
					<p>Name of playlist</p>
					<img src="" alt="Album Image" />
					<button>Stuff</button>
				</div>
				<div>
					<p>Name of playlist</p>
					<img src="" alt="Album Image" />
					<button>Stuff</button>
				</div>
				<div>
					<p>Name of playlist</p>
					<img src="" alt="Album Image" />
					<button>Stuff</button>
				</div>
			</div>
		</div>
	);
};


export default HomePageLoggedIn

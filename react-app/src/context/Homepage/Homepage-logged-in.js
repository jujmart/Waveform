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
		<div id="homepage-LI-container_div">
			{/* Recently Added Songs Divider */}
			<div>
				<h2>Recently Added Songs</h2>
				{Object.keys(songs).length && (
					<>
						<div>
							<Song songId={Object.keys(songs)[0]} />
						</div>
						<div>
							<Song songId={Object.keys(songs)[1]} />
						</div>
						<div>
							<Song songId={Object.keys(songs)[2]} />
						</div>
						<div>
							<Song songId={Object.keys(songs)[3]} />
						</div>
						<div>
							<Song songId={Object.keys(songs)[4]} />
						</div>
					</>
				)}
			</div>

			{/* Checkout Other Playlists Divider */}
			<div>
				<h2> Playlists</h2>
				<div>
					<p>Name of playlist</p>
					<img src="" alt="Album Img" />
					<button>Stuff</button>
				</div>
				<div>
					<p>Name of playlist</p>
					<img src="" alt="Album Img" />
					<button>Stuff</button>
				</div>
				<div>
					<p>Name of playlist</p>
					<img src="" alt="Album Img" />
					<button>Stuff</button>
				</div>
				<div>
					<p>Name of playlist</p>
					<img src="" alt="Album Img" />
					<button>Stuff</button>
				</div>
				<div>
					<p>Name of playlist</p>
					<img src="" alt="Album Img" />
					<button>Stuff</button>
				</div>
			</div>
		</div>
	);
};

export default HomePageLoggedIn;

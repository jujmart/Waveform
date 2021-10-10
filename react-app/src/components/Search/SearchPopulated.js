import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PlaylistCard from "../PlaylistCard";
import Song from "../Song";

const SearchPopulated = () => {
	const search = useSelector((state) => state.search);
	const users = useSelector((state) => state.users);

	return (
		<div id="search-populated-container">
			{search.songs.length ? (
				<div className="search-populated_subcontainer-div">
					<h1 className="search-populated_header">Songs</h1>
					<div id="search-populated_song-info">
						<p className="search-populated_playlist-title">Title</p>
						<p className="search-populated_playlist-artist">
							Artist
						</p>
						<p className="search-populated_playlist-album">Album</p>
						<p className="search-populated_playlist-date">
							Date Added
						</p>
					</div>
					{search.songs.map((songId) => (
						<div
							className="playlist-song-container_div"
							key={songId}
						>
							<Song songId={songId} />
						</div>
					))}
				</div>
			) : null}
			{search.playlists.length ? (
				<div className="search-populated_subcontainer-div">
					<h1 className="search-populated_header">Playlists</h1>

					{search.playlists.map((playlistId) => (
						<div
							className="playlist-card_container"
							key={playlistId}
						>
							<PlaylistCard playlistId={playlistId} />
						</div>
					))}
				</div>
			) : null}
			{search.users.length ? (
				<div className="search-populated_subcontainer-div">
					<h1 className="search-populated_header">Users</h1>
					{search.users.map((userId) => (
						<Link to={`/users/${userId}`} key={userId}>
							<div
								key={userId}
								className="newest-song-container_div"
							>
								<img
									className="song-activity-album_img"
									src={users[userId]?.profilePhotoUrl}
									alt="Friend Img"
								/>
								<p className="song-activity-song_p">
									{users[userId]?.username}
								</p>
								<p className="song-activity-album_p">
									Joined On:{" "}
									{users[userId]?.createdAt
										?.split(" ")
										.splice(1, 3)
										.join(" ")}
								</p>
							</div>
						</Link>
					))}
				</div>
			) : null}
			{!search.songs.length &&
			!search.playlists.length &&
			!search.users.length ? (
				<div className="search-populated_subcontainer-div">
					<h1 className="search-populated_header">
						No results found
					</h1>
				</div>
			) : null}
		</div>
	);
};

export default SearchPopulated;

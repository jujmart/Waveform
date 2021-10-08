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
					<h2 className="search-populated_header">Songs</h2>
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
					<h2 className="search-populated_header">Playlists</h2>
					{search.playlists.map((playlistId) => (
						<PlaylistCard
							playlistId={playlistId}
							key={playlistId}
						/>
					))}
				</div>
			) : null}
			{search.users.length ? (
				<div className="search-populated_subcontainer-div">
					<h2 className="search-populated_header">Users</h2>
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
					<h2 className="search-populated_header">
						No results found
					</h2>
				</div>
			) : null}
		</div>
	);
};

export default SearchPopulated;

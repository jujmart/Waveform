import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PlaylistCard from "../PlaylistCard";
import Song from "../Song";

const SearchPopulated = () => {
	const search = useSelector((state) => state.search);
	const users = useSelector((state) => state.users);

	return (
		<div>
			<h1>POPULATED</h1>
			{search.songs.map((songId) => (
				<Song songId={songId} />
			))}
			{search.playlists.map((playlistId) => (
				<PlaylistCard playlistId={playlistId} />
			))}
			{search.users.map((userId) => (
				<Link to={`/users/${userId}`} key={userId}>
					<div key={userId} className="newest-song-container_div">
						<img
							className="song-activity-album_img"
							src={users[userId].profilePhotoUrl}
							alt="Friend Img"
						/>
						<p className="song-activity-song_p">
							{users[userId].username}
						</p>
						<p className="song-activity-album_p">
							Joined On:{" "}
							{users[userId].createdAt
								?.split(" ")
								.splice(1, 3)
								.join(" ")}
						</p>
					</div>
				</Link>
			))}
		</div>
	);
};

export default SearchPopulated;

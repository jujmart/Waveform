import { useDispatch, useSelector } from "react-redux";
import { removeSong } from "../store/songQueue";
import { v4 as uuidv4 } from "uuid";
import Song from "./Song";
import "./css/song-queue.css";

const SongQueue = () => {
	const dispatch = useDispatch();
	const songIds = useSelector((state) => state.songQueue);

	const removeSongFromQueue = (songId, idx) => {
		dispatch(removeSong(songId, idx));
	};

	return (
		<div className="song_queue_container">
			<div className="Queue_title">Queue</div>
			{songIds.length ? (
				<div id="song-info_display_queue">
					<p id="song-info_display_queue_title">Title</p>
					<p id="song-info_display_queue_artist">Artist</p>
					<p id="song-info_display_queue_album">Album</p>
					<p id="song-info_display_queue_date">Date Added</p>
				</div>
			) : null}

			{songIds.length ? (
				songIds.map((songId, idx) => (
					<div
						className="playlist-song-container_div_queue-page"
						key={uuidv4()}
					>
						<Song songId={songId} />

						<span
							className="allow-pointer-events material-icons removeFromQueue"
							onClick={() => removeSongFromQueue(songId, idx)}
						>
							clear
						</span>
					</div>
				))
			) : (
				<div className="No_songs_queue">No songs in queue</div>
			)}
		</div>
	);
};

export default SongQueue;

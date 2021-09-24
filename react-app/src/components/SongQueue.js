import { useDispatch, useSelector } from "react-redux";
import { removeSong } from "../store/songQueue";
import Song from "./Song";

const SongQueue = () => {
	const dispatch = useDispatch();
	const songIds = useSelector((state) => state.songQueue);

	const removeSongFromQueue = (songId) => {
		dispatch(removeSong(songId));
	};

	return (
		<>
			{songIds.length ? (
				songIds.map((songId) => (
					<div className="playlist-song-container_div" key={songId}>
						<Song songId={songId} />
						<button
							onClick={() => removeSongFromQueue(songId)}
							style={{ zIndex: "100" }}
						>
							Remove from Queue
						</button>
					</div>
				))
			) : (
				<div>No songs in queue</div>
			)}
		</>
	);
};

export default SongQueue;

import { useSelector } from "react-redux";
import Song from "./Song";

const SongQueue = () => {
	const songIds = useSelector((state) => state.songQueue);

	return songIds.map((songId) => <Song songId={songId} />);
};

export default SongQueue;

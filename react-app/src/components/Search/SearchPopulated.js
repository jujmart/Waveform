import { useSelector } from "react-redux";

const SearchPopulated = () => {
	const search = useSelector((state) => state.search);

	return (
		<div>
			{search.songs &&
				Object.values(search.songs).map((song) => (
					<div key={song.id}>{song.title}</div>
				))}
			{search.playlists &&
				Object.values(search.playlists).map((playlist) => (
					<div key={playlist.id}>{playlist.title}</div>
				))}
		</div>
	);
};

export default SearchPopulated;

import { useSelector } from "react-redux";

const SearchPopulated = () => {
	const search = useSelector((state) => state.search);

	return (
		<div>
			<h1>POPULATED</h1>
			{search.songs &&
				Object.values(search.songs).map((song) => (
					<div key={song.id}>{song.title}</div>
				))}
			{search.playlists &&
				Object.values(search.playlists).map((playlist) => (
					<div key={playlist.id}>{playlist.title}</div>
				))}
			{search.users &&
				Object.values(search.users).map((user) => (
					<div key={user.id}>{user.username}</div>
				))}
			{search.genres &&
				Object.values(search.genres).map((genre) => (
					<div key={genre.id}>{genre.genreName}</div>
				))}
		</div>
	);
};

export default SearchPopulated;

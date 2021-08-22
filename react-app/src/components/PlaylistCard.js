import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSongThunk } from "../store/songs";

const PlaylistCard = ({ playlistId }) => {
	const playlists = useSelector((state) => state.playlists);
	const songs = useSelector((state) => state.songs);
	const dispatch = useDispatch();
	const [firstSongId, setFirstSongId] = useState(null);

	useEffect(() => {
		setFirstSongId(playlists[playlistId]?.songs[0]);
	}, [playlists, playlistId]);

	useEffect(() => {
		if (firstSongId && !songs[firstSongId]) {
			dispatch(getOneSongThunk(firstSongId));
		}
	}, [songs, firstSongId, dispatch]);

	return (
		<div>
			<img
				src={songs[firstSongId]?.albumImageUrl}
				alt="First Song Album Img"
			/>
			<h4>{playlists[playlistId]?.title}</h4>
			<p>
				{playlists[playlistId]?.description.slice(0, 40).trim()}
				{playlists[playlistId]?.description.length > 40 && "..."}
			</p>
		</div>
	);
};
export default PlaylistCard;

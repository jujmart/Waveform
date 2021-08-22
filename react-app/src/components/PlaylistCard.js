import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSongThunk } from "../store/songs";

const PlaylistCard = ({ playlistId }) => {
	const playlists = useSelector((state) => state.playlists);
	const playlistSongId = useSelector(
		(state) => state.playlists[playlistId]?.songs[0]
	);
	const songs = useSelector((state) => state.songs);
	const dispatch = useDispatch();
	// const [firstSongId, setFirstSongId] = useState(null);

	// useEffect(() => {
	// 	if (playlists[playlistId]?.songs[0]) {
	// 		setFirstSongId(playlists[playlistId]?.songs[0]);
	// 	}
	// }, [playlists, playlistId, playlistSongId]);

	useEffect(() => {
		if (playlistSongId && !songs[playlistSongId]) {
			dispatch(getOneSongThunk(playlistSongId));
		}
	}, [songs, playlistSongId, dispatch]);

	return (
		<div>
			<img
				src={
					songs[playlistSongId]?.albumImageUrl
						? songs[playlistSongId]?.albumImageUrl
						: "https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Album-Images/Seeder1-NoAlbumImage.jpeg"
				}
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

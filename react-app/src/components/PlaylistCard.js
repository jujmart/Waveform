import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getOneSongThunk } from "../store/songs";

const PlaylistCard = ({ playlistId }) => {
	const playlists = useSelector((state) => state.playlists);
	const firstSongId = useSelector(
		(state) => state.playlists[playlistId]?.songs[0]
	);
	const songs = useSelector((state) => state.songs);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (firstSongId && !songs[firstSongId]) {
			dispatch(getOneSongThunk(firstSongId));
		}
	}, [songs, firstSongId, dispatch]);

	return (
		<>
			<img className='playlist-card_img'
				onClick={() => history.push(`/playlists/${playlistId}`)} 
				src={
					songs[firstSongId]?.albumImageUrl
						? songs[firstSongId]?.albumImageUrl
						: "https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Album-Images/Seeder1-NoAlbumImage.jpeg"
				}
				alt="First Song Album Img"
			/>
			<h4 className='playlist-card_h4'>{playlists[playlistId]?.title}</h4>
			<p className='playlist-card_p'>
				{playlists[playlistId]?.description.slice(0, 40).trim()}
				{playlists[playlistId]?.description.length > 40 && "..."}
			</p>
		</>
	);
};
export default PlaylistCard;

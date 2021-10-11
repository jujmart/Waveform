import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addSong, addSongPriority } from "../store/songQueue";
import PlaylistDropDown from "./PlaylistAddDropDown";

const Song = ({ songId, playlistId }) => {
	//page that renders this song component will put the song in songs slice of state
	const song = useSelector((state) => state.songs[songId]);
	const userPlaylistIds = useSelector(
		(state) => state.userMusicInfo.playlists
	);

	const playlists = useSelector((state) => state.playlists);
	const [showQueueBox, setShowQueueBox] = useState(false);
	const dispatch = useDispatch();

	const handleSongPlay = () => {
		dispatch(addSongPriority(songId));
	};

	const handleAddToQueue = () => {
		dispatch(addSong(songId));
		setShowQueueBox(true);
	};

	useEffect(() => {
		if (setShowQueueBox) {
			const timeout = setTimeout(() => setShowQueueBox(false), 1500);
			return () => clearTimeout(timeout);
		}
	}, [showQueueBox]);

	return (
		<>
			{showQueueBox && (
				<div
					id="queuebox"
					style={{
						position: "fixed",
						backgroundColor: "red",
						top: "0px",
						right: "50%",
					}}
				>
					Song added to queue
				</div>
			)}
			<span
				className="allow-pointer-events song-icon material-icons"
				onClick={handleSongPlay}
			>
				play_arrow
			</span>
			<span
				className="allow-pointer-events song-icon material-icons"
				onClick={handleAddToQueue}
			>
				playlist_play
			</span>
			<img
				className="playlist-song_album-img"
				src={song?.albumImageUrl}
				alt="Song Album Cover"
			/>
			<div>{song?.title}</div>
			<div>{song?.artist}</div>
			<div>{song?.album}</div>
			<div>{song?.createdAt?.split(" ").splice(1, 3).join(" ")}</div>
			<PlaylistDropDown
				songId={songId}
				userPlaylistIds={userPlaylistIds}
				playlists={playlists}
				playlistId={playlistId}
			/>
		</>
	);
};

export default Song;

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addSongToPlaylistThunk } from "../store/playlist";
import { addSong, addSongPriority } from "../store/songQueue";

const Song = ({ songId, playlistId }) => {
	//page that renders this song component will put the song in songs slice of state
	const song = useSelector((state) => state.songs[songId]);
	const userPlaylistIds = useSelector(
		(state) => state.userMusicInfo.playlists
	);
	const playlists = useSelector((state) => state.playlists);
	const [showPlaylistsDiv, setShowPlaylistsDiv] = useState(false);
	const [showQueueBox, setShowQueueBox] = useState(false);
	const dispatch = useDispatch();

	const addToPlaylist = async (e) => {
		await dispatch(addSongToPlaylistThunk(songId, e.target.value));
		setShowPlaylistsDiv(false);
	};

	const handleSongPlay = () => {
		dispatch(addSongPriority(songId));
	};

	const handleAddToQueue = () => {
		dispatch(addSong(songId));
		setShowQueueBox(true);
	};

	useEffect(() => {
		if (setShowQueueBox) {
			setTimeout(() => setShowQueueBox(false), 1500);
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
			<p className="allow-pointer-events">
				<span
					onClick={() =>
						setShowPlaylistsDiv((prevState) => !prevState)
					}
					className="allow-pointer-events material-icons"
				>
					playlist_add
				</span>

				{showPlaylistsDiv && (
					<div className="add-to-playlist_dropdown">
						<ul className="add-to-playlist_dropdown_ul">
							{userPlaylistIds.map((userPlaylistId) =>
								playlistId !== userPlaylistId ? (
									<li
										key={userPlaylistId}
										value={userPlaylistId}
										onClick={addToPlaylist}
										className="add-to-playlist_dropdown_li"
									>
										{playlists[userPlaylistId].title}
									</li>
								) : null
							)}
						</ul>
					</div>
				)}
			</p>
		</>
	);
};

export default Song;

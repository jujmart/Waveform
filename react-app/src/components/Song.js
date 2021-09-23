import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addSongToPlaylistThunk } from "../store/playlist";

const Song = ({ songId, playlistId }) => {
	//page that renders this song component will put the song in songs slice of state
	const song = useSelector((state) => state.songs[songId]);
	const userPlaylistIds = useSelector(
		(state) => state.userMusicInfo.playlists
	);
	const playlists = useSelector((state) => state.playlists);
	const [showPlaylistsDiv, setShowPlaylistsDiv] = useState(false);
	const dispatch = useDispatch();

	const addToPlaylist = async (e) => {
		await dispatch(addSongToPlaylistThunk(songId, e.target.value));
		setShowPlaylistsDiv(false);
	};

	const handleLike = async () => {};

	return (
		<>
			<img
				className="playlist-song_album-img"
				src={song?.albumImageUrl}
				alt="Song Album Cover"
			/>
			<div>{song?.title}</div>
			<div>{song?.artist}</div>
			<div>{song?.album}</div>
			<div>{song?.createdAt?.split(" ").splice(1, 3).join(" ")}</div>
			<button onClick={handleLike}>Like</button>
			<div onClick={() => setShowPlaylistsDiv((prevState) => !prevState)}>
				<span className="material-icons">playlist_add</span>

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
			</div>
		</>
	);
};

export default Song;

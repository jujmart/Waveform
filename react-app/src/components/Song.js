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

	return (
		<div>
			<img src={song?.albumImageUrl} />
			<div>{song?.title}</div>
			<div>{song?.artist}</div>
			<div>{song?.album}</div>
			<div>{song?.createdAt}</div>
			<button
				onClick={() => setShowPlaylistsDiv((prevState) => !prevState)}
			>
				Add to Playlist
			</button>
			{showPlaylistsDiv && (
				<div>
					<ul>
						{userPlaylistIds.map((userPlaylistId) =>
							playlistId !== userPlaylistId ? (
								<li
									key={userPlaylistId}
									value={userPlaylistId}
									onClick={addToPlaylist}
								>
									{playlists[userPlaylistId].title}
								</li>
							) : null
						)}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Song;

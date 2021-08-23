import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSongsThunk } from "../../store/songs";
import Song from "../../components/Song";
import PlaylistCard from "../../components/PlaylistCard";
import { getAllPlaylistsThunk } from "../../store/playlist";

const HomePageLoggedIn = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const songs = useSelector((state) => state.songs);
	const [addedSongIds, setAddedSongIds] = useState([]);

	useEffect(() => {
		dispatch(getAllSongsThunk());
	}, [dispatch]);

	useEffect(() => {
		(async () => {
			const playlistList = await dispatch(getAllPlaylistsThunk(5));
			const idArr = playlistList.map((playlist) => playlist.id);
			setAddedSongIds(idArr);
		})();
	}, [dispatch]);

	return (
		<div id="user-profile-container_div">

				<div id='song-playlist-container_div'>



					<h2 className='profile-section-title_h2'>Recently Added Songs</h2>

					<div id="song-info">
					<p>Title</p>
					<p>Artist</p>
					<p>Album</p>
					<p>Date Added</p>
					</div>
			{/* Recently Added Songs Divider */}
				<div id='playlist-info-container_div'>
					{Object.keys(songs).length &&
						Object.keys(songs).map((songId) => (
							<div className='playlist-song-container_div' key={songId}>
								<Song songId={songId} />
							</div>
						))}
				</div>
				<h2 className='profile-section-title_h2'> Recently Added Playlists</h2>
					<div className='user-profile-playlists_div'>
							{addedSongIds.map((playlistId) => (
								<div className='playlist-card_container' key={playlistId}>
									<PlaylistCard playlistId={playlistId} />
								</div>
							))}
					</div>
					<h1 id='you-found-me'>shh keep your secrets</h1>
				</div>

				{/* Checkout Other Playlists Divider */}



		</div>
	);
};

export default HomePageLoggedIn;

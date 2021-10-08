import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Song from "../../components/Song";
import PlaylistCard from "../../components/PlaylistCard";
import { getAllPlaylistsThunk } from "../../store/playlist";
import {
	getRecentPlaylistsThunk,
	getRecentSongsThunk,
} from "../../store/recent";

const HomePageLoggedIn = () => {
	const dispatch = useDispatch();
	const songs = useSelector((state) => state.songs);
	const recentSongIds = useSelector((state) => state.recent.songs);
	const recentPlaylistIds = useSelector((state) => state.recent.playlists);

	useEffect(() => {
		dispatch(getRecentSongsThunk());
		dispatch(getRecentPlaylistsThunk());
	}, [dispatch]);

	return (
		<div id="user-profile-container_div">
			<div id="song-playlist-container_div">
				<h2 className="profile-section-title_h2">
					Recently Added Songs
				</h2>

				<div id="song-info">
				<p className='playlist-title'>Title</p>
					<p className='playlist-artist'>Artist</p>
					<p className='playlist-album'>Album</p>
					<p className='playlist-date'>Date Added</p>
				</div>
				{/* Recently Added Songs Divider */}
				<div id="playlist-info-container_div">
					{recentSongIds.map((songId) => (
						<div
							className="playlist-song-container_div"
							key={songId}
						>
							<Song songId={songId} />
						</div>
					))}
				</div>
				<h2 className="profile-section-title_h2">
					{" "}
					Recently Added Playlists
				</h2>
				<div className="user-profile-playlists_div">
					{recentPlaylistIds.map((playlistId) => (
						<div
							className="playlist-card_container"
							key={playlistId}
						>
							<PlaylistCard playlistId={playlistId} />
						</div>
					))}
				</div>
				<h1 id="you-found-me">shh keep your secrets</h1>
			</div>

			{/* Checkout Other Playlists Divider */}
		</div>
	);
};

export default HomePageLoggedIn;

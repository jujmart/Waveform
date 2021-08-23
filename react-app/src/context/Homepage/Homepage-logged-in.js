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
		<div id="homepage-LI-container_div">
			{/* Recently Added Songs Divider */}
			<div>
				<h2>Recently Added Songs</h2>
				{Object.keys(songs).length &&
					Object.keys(songs).map((songId) => (
						<div key={songId}>
							<Song songId={songId} />
						</div>
					))}
			</div>

			{/* Checkout Other Playlists Divider */}
			<div>
				<h2> Recently Added Playlists</h2>
				<div>
					{addedSongIds.map((playlistId) => (
						<div key={playlistId}>
							<PlaylistCard playlistId={playlistId} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default HomePageLoggedIn;

import React, { useState, useCallback, useEffect, createRef, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import {
	getOnePlaylistThunk,
	deletePlaylistThunk,
	getPlaylistUserThunk,
	removeSongFromPlaylistThunk,
} from "../store/playlist";
import { setPlaylistSongsThunk } from "../store/songs";
import { deleteUserPlaylist } from "../store/userMusicInfo";
import EditPlaylistFormModal from "./EditPlaylistForm";
import Song from "./Song";
import "./css/playlists.css";

const DisplayPlaylist = () => {
	const { id } = useParams();
	const history = useHistory();
	const [songsNotInStore, setSongsNotInStore] = useState([]);
	const [currentPlaylist, setCurrentPlaylist] = useState({});
	const [playlistUser, setPlaylistUser] = useState({});
	const user = useSelector((state) => state.session.user);
	const songs = useSelector((state) => state.songs);
	const firstSongId = useSelector((state) => state.playlists[id]?.songs[0]);
	const playlists = useSelector((state) => state.playlists);
	const dispatch = useDispatch();

	const handleDelete = async () => {
		await dispatch(deletePlaylistThunk(id));
		await dispatch(deleteUserPlaylist(id));
	};

	const handleRemoveSongFromPlaylist = (songId) => {
		dispatch(removeSongFromPlaylistThunk(id, songId));
	};

	useEffect(() => {
		(async () => {
			if (!playlists[id]) {
				const error = await dispatch(getOnePlaylistThunk(id));
				if (error) {
					history.push("/");
				}
			}
		})();
	}, [dispatch, id, playlists, history]);

	useEffect(() => {
		if (playlists[id]) {
			setCurrentPlaylist(playlists[id]);
		}
	}, [playlists, id]);

	useEffect(() => {
		currentPlaylist?.songs?.forEach((songId) => {
			if (!songs[songId]) {
				if (!songsNotInStore.includes(songId)) {
					setSongsNotInStore((prevState) => [...prevState, songId]);
				}
			}
		});
	}, [dispatch, songs, currentPlaylist, songsNotInStore]);

	useEffect(() => {
		if (songsNotInStore.length) {
			dispatch(setPlaylistSongsThunk(songsNotInStore));
		}
	}, [dispatch, songsNotInStore]);

	useEffect(() => {

		(async () => {
			const user = await dispatch(getPlaylistUserThunk(id));
			setPlaylistUser(user);
		})();
	}, [dispatch, id]);





	return (
		<div id="playlist-container_div">
			<div id="playlist-info_div">
				<img
					id="playlist-info_img"
					src={
						firstSongId
							? songs[firstSongId]?.albumImageUrl
							: "https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Album-Images/Seeder1-NoAlbumImage.jpeg"
					}
					alt="Playlist Img"
				/>
				<p id="playlist_p">PLAYLIST</p>
				<h2 id="playlist_h2">{currentPlaylist?.title}</h2>
				<p id="playlist_p-description">
					{currentPlaylist?.description}
				</p>
				<Link id="playlist_creator" to={`/users/${playlistUser.id}`}>
					{playlistUser.username} ·{" "}
					<span>
						{currentPlaylist?.createdAt
							?.split(" ")
							.splice(1, 3)
							.join(" ")}
					</span>
				</Link>
			</div>

			{/* PLAY CURRENT PLAYLIST BUTTON */}
			<div id="playlist-controls_div">
				<span id="play_button" className="material-icons">
					play_circle_filled
				</span>

				{currentPlaylist.userId === user.id && (
					<>
						<div id="user-creation_dropdown-container">
							<span id="user-creation_span">...</span>
							<div id="user-creation-buttons">
								<EditPlaylistFormModal />
								<p onClick={handleDelete}>Delete Playlist</p>
							</div>
						</div>
					</>
				)}
			</div>

			<div id="song-info_display">
				<p>Title</p>
				<p>Artist</p>
				<p>Album</p>
				<p>Date Added</p>
			</div>

			<div id="playlist-info-container_div">
				{currentPlaylist &&
					currentPlaylist?.songs?.map((songId) => (
						<div
							className="playlist-song-container_div"
							key={songId}
							data-tag={JSON.stringify({song:songId, playlistId: +id, createdById: currentPlaylist.userId})}
						>
							<Song
								songId={songId}
								playlistId={currentPlaylist.id}
							/>
							{currentPlaylist.userId === user.id && (
								<p
									className='allow-pointer-events'
									onClick={() =>
										handleRemoveSongFromPlaylist(songId)
									}
								>
									<span className="material-icons">
										clear
									</span>
								</p>
							)}
						</div>
					))}
			</div>
		</div>
	);
};

export default DisplayPlaylist;

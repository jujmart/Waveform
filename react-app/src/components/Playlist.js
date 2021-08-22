import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import {
	getOnePlaylistThunk,
	deletePlaylistThunk,
	getPlaylistUserThunk,
	removeSongFromPlaylistThunk,
} from "../store/playlist";
import { setPlaylistSongsThunk } from "../store/songs";
import { deleteUserPlaylist, getUserSongsThunk } from "../store/userMusicInfo";
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
	const playlists = useSelector((state) => state.playlists);
	const dispatch = useDispatch();

	const handleDelete = async () => {
		await dispatch(deletePlaylistThunk(id));
		await dispatch(deleteUserPlaylist(id));
	};

	const handleRemoveSongFromPlaylist = (e) => {
		dispatch(removeSongFromPlaylistThunk(id, e.target.value));
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
			<div id='playlist-info_div'>
				<img id='playlist-info_img' src="https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Album-Images/Acting-Up_album.jpeg" alt="Playlist Image" />
				<p id='playlist_p'>PLAYLIST</p>
				<h2 id='playlist_h2'>{currentPlaylist?.title}</h2>
				<p>{currentPlaylist?.description}</p>
				<Link id='playlist_creator' to={`/users/${playlistUser.id}`}>{playlistUser.username}  ·  <span>{currentPlaylist?.createdAt
						?.split(" ")
						.splice(1, 3)
						.join(" ")}</span></Link>
			</div>

			{/* PLAY CURRENT PLAYLIST BUTTON */}
			<div id='playlist-controls_div'>
			<span id='play_button' class="material-icons">play_circle_filled</span>

				{currentPlaylist.userId === user.id && (
					<>
						<EditPlaylistFormModal />
						<button onClick={handleDelete}>Delete Playlist</button>
					</>
				)}
			</div>
		<div id='playlist-info-container_div'>

			{/* ITERATING TO FIND EACH INDIVIDUAL SONG AND DISPLAY */}
			<div id='playlist-songs_div'>
				<div>
					<p>Title</p>
					<p>Album</p>
					<p>Date Added</p>
				</div>
				{currentPlaylist &&
					currentPlaylist?.songs?.map((songId) => (
						<div key={songId}>
							<Song
								songId={songId}
								playlistId={currentPlaylist.id}
							/>
							{currentPlaylist.userId === user.id && (
								<button
									onClick={(e) =>
										handleRemoveSongFromPlaylist(e)
									}
									value={songId}
								>
									Delete Song from Playlist
								</button>
							)}
						</div>
					))}
			</div>
		</div>
	</div>
	);
};

export default DisplayPlaylist;

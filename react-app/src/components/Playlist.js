import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, useParams, Link } from "react-router-dom";
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
			<div>
				<img src="" alt="Playlist Image" />
				<p></p>
				<h2>{currentPlaylist?.title}</h2>
				<p>{currentPlaylist?.description}</p>
				<p>
					Created by{" "}
					{
						<Link to={`/users/${playlistUser.id}`}>
							{playlistUser.username}
						</Link>
					}
				</p>
				<p>
					Added on{" "}
					{currentPlaylist?.createdAt
						?.split(" ")
						.splice(1, 3)
						.join(" ")}
				</p>
				{currentPlaylist.userId === user.id && (
					<>
						<EditPlaylistFormModal />
						<button onClick={handleDelete}>Delete Playlist</button>
					</>
				)}
			</div>

			{/* PLAY CURRENT PLAYLIST BUTTON */}
			<div>
				<button>Play Current Playlist</button>
			</div>

			{/* ITERATING TO FIND EACH INDIVIDUAL SONG AND DISPLAY */}
			<div>
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
	);
};

export default DisplayPlaylist;

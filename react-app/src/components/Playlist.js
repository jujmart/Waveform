import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { getOnePlaylistThunk, deletePlaylistThunk } from "../store/playlist";
import { setPlaylistSongsThunk } from "../store/songs";
import { deleteUserPlaylist, getUserSongsThunk } from "../store/userMusicInfo";
import EditPlaylistFormModal from "./EditPlaylistForm";

const DisplayPlaylist = () => {
	const { id } = useParams();
	const history = useHistory();
	const [songsNotInStore, setSongsNotInStore] = useState([]);
	const [currentPlaylist, setCurrentPlaylist] = useState({});
	const user = useSelector((state) => state.session.user);
	const songs = useSelector((state) => state.songs);
	const playlists = useSelector((state) => state.playlists);
	const dispatch = useDispatch();

	const handleDelete = () => {
		dispatch(deletePlaylistThunk(id));
		dispatch(deleteUserPlaylist(id));
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
	}, [dispatch, id, playlists]);

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

	console.log(currentPlaylist.songs)

	return (
		<div>
			<div>
				<img src='' alt='Playlist Image' />
				<p></p>
				<h2>{currentPlaylist?.title}</h2>
				<p>{currentPlaylist?.description}</p>
				<p>{`Created by${currentPlaylist?.userId} <=== Needs to be updated`}</p>
				<p>{`Added on ${currentPlaylist?.createdAt?.split(" ").splice(1, 3).join(" ")}`}</p>
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
					<p>Length</p>
				</div>
				{currentPlaylist && currentPlaylist?.songs?.map(song => (
					<div>
						<p>{song.id}</p>
											<p>{song}</p> {/* REMOVE BEFORE DEPLOYING */}
						<p>Title</p>
						<p>Album</p>
						<p>Date Added</p>
						<p>Length</p>
						<audio></audio>
					</div>


				))}

			</div>



		</div>
	);
};

export default DisplayPlaylist;

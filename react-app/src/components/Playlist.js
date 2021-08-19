import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { getOnePlaylistThunk } from "../store/playlist";
import { setPlaylistSongsThunk } from "../store/songs";

const DisplayPlaylist = () => {
	const { id } = useParams();
	const [songsNotInStore, setSongsNotInStore] = useState([]);
	const [currentPlaylist, setCurrentPlaylist] = useState({});
	const user = useSelector((state) => state.session.user);
	const songs = useSelector((state) => state.songs);
	const playlists = useSelector((state) => state.playlists);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!playlists[id]) {
			dispatch(getOnePlaylistThunk(id));
		}
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

	return (
    <div>
      <h2>{currentPlaylist?.title}</h2>
      <h3>{currentPlaylist?.description}</h3>
      {currentPlaylist?.songs?.map((songId) => {
        return (
          <div>
            <div>{songs[songId]?.title}</div>
            <div>{songs[songId]?.album}</div>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayPlaylist;

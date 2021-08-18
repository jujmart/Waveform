import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAllGenresThunk } from "../store/genre";
import { uploadSongThunk } from "../store/songs";

const SongForm = () => {
	const [errors, setErrors] = useState([]);
	const [songUrl, setSongUrl] = useState("");
	const [title, setTitle] = useState("");
	const [artist, setArtist] = useState("");
	const [album, setAlbum] = useState("");
	const [albumImageUrl, setAlbumImageUrl] = useState("");
	const [genres, setGenres] = useState(new Set());
	const user = useSelector((state) => state.session.user);
	const genresList = useSelector((state) => state.genres);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllGenresThunk());
	}, [dispatch]);

	const handleOptionClick = (e) => {
		setGenres((prevGenres) => prevGenres.add(+e.target.value));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = {
			songUrl,
			title,
			artist,
			album,
			albumImageUrl,
			genres: [...genres],
		};
		console.log(data);
		await dispatch(uploadSongThunk(data));
	};

	return (
		<div>
			<h2>Title</h2>
			<h3>Description</h3>
		</div>
	);
};

export default SongForm;

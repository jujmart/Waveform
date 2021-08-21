import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAllGenresThunk } from "../store/genre";
import { uploadSongThunk } from "../store/songs";
import './css/song-form.css'

const SongForm = () => {
	const [errors, setErrors] = useState([]);
	const [songUrl, setSongUrl] = useState(null);
	const [title, setTitle] = useState("");
	const [artist, setArtist] = useState("");
	const [album, setAlbum] = useState("");
	const [albumImage, setAlbumImage] = useState("");
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
		let songData = new FormData();
		songData.set("file", songUrl);
		songData.set("image", albumImage);

		const data = {
			title,
			artist,
			album,
			genres: [...genres],
		};

		await dispatch(uploadSongThunk(data, songData));
	};

	return (

		<form onSubmit={handleSubmit}>
			<div>
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>
			<div>
				<img
					src={
						albumImage
							? URL.createObjectURL(albumImage)
							: "https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Album-Images/Seeder1-NoAlbumImage.jpeg"
					}
					alt="Album Cover"
				/>
				<label htmlFor="songUrl">Audio File</label>
				<input
					type="file"
					accept=".m4a,.flac,.mp3,.mp4,.wav,.wma,.aac"
					name="songUrl"
					onChange={(e) => {
						setSongUrl(e.target.files[0]);
					}}
				/>
			</div>
			<div>
				<label htmlFor="title">Title</label>
				<input
					name="title"
					type="text"
					placeholder="title"
					value={title}
					required
					onChange={(e) => {
						setTitle(e.target.value);
					}}
				/>
			</div>
			<div>
				<label htmlFor="artist">Artist</label>
				<input
					name="artist"
					type="text"
					placeholder="artist"
					value={artist}
					onChange={(e) => {
						setArtist(e.target.value);
					}}
				/>
			</div>
			<div>
				<label htmlFor="album">Album</label>
				<input
					name="album"
					type="text"
					placeholder="album"
					value={album}
					onChange={(e) => {
						setAlbum(e.target.value);
					}}
				/>
			</div>
			<div>
				<label htmlFor="albumImage">Album Image</label>
				<input
					type="file"
					accept=".pdf,.png,.jpg,.jpeg,.gif"
					name="albumImage"
					onChange={(e) => {
						setAlbumImage(e.target.files[0]);
					}}
				/>
	);
};

export default SongForm;

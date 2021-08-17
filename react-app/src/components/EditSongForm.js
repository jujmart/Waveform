import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { getAllGenresThunk } from "../store/genre";
import { getAllSongsThunk, uploadSongThunk } from "../store/songs";

const EditSongForm = () => {
	const { id } = useParams();
	const song = useSelector((state) => state.allSongs[id]);
	const [errors, setErrors] = useState([]);
	const [songUrl, setSongUrl] = useState(song?.songUrl);
	const [title, setTitle] = useState(song?.title);
	const [artist, setArtist] = useState(song?.artist);
	const [album, setAlbum] = useState(song?.album);
	const [albumImageUrl, setAlbumImageUrl] = useState(song?.albumImageUrl);
	const [genres, setGenres] = useState(
		new Set()
		// !song ? new Set(...song[id].genres.map((genre) => genre.id)) : new Set()
	);
	const user = useSelector((state) => state.session.user);
	const genresList = useSelector((state) => state.genres);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllGenresThunk());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getAllSongsThunk());
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
		await dispatch(uploadSongThunk(data));
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>
			<div>
				{/* Need to be updated for aws */}
				<label htmlFor="songUrl">songUrl</label>
				<input
					name="songUrl"
					type="text"
					placeholder="songUrl"
					value={songUrl}
					required
					onChange={(e) => {
						setSongUrl(e.target.value);
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
				{/* Need to be updated for aws */}
				<label htmlFor="albumImageUrl">AlbumImageUrl</label>
				<input
					name="albumImageUrl"
					type="text"
					placeholder="albumImageUrl"
					value={albumImageUrl}
					onChange={(e) => {
						setAlbumImageUrl(e.target.value);
					}}
				/>
			</div>
			<div>
				<label htmlFor="genres">Genres</label>
				<select
					name="genres"
					onChange={(e) => handleOptionClick(e)}
					defaultValue="Select Genre"
				>
					<option disabled>Select Genre</option>
					{genresList.map((genre) => (
						<option key={genre.id} value={genre.id}>
							{genre.genreName}
						</option>
					))}
				</select>
			</div>
			<button type="submit">Submit</button>
		</form>
	);
};

export default EditSongForm;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { getAllGenresThunk } from "../store/genre";
import {
	getOneSongThunk,
	editSongThunk,
	deleteSongThunk,
} from "../store/songs";
import { deleteUserSong, getUserSongsThunk } from "../store/userMusicInfo";

const EditSongForm = () => {
	const { id } = useParams();
	const song = useSelector((state) => state.songs[id]);
	const [errors, setErrors] = useState([]);
	const [title, setTitle] = useState("");
	const [artist, setArtist] = useState("");
	const [album, setAlbum] = useState("");
	const [albumImage, setAlbumImage] = useState(null);
	const [genres, setGenres] = useState(new Set());
	const user = useSelector((state) => state.session.user);
	const genresList = useSelector((state) => state.genres);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllGenresThunk());
	}, [dispatch]);

	useEffect(() => {
		if (!song) dispatch(getOneSongThunk(id));
	}, [dispatch, song, id]);

	useEffect(() => {
		setTitle(song?.title);
		setArtist(song?.artist);
		setAlbum(song?.album);
		setGenres(
			song?.genres
				? new Set(
						song.genres.map(
							(genreName) =>
								genresList.find(
									(genre) => genre.genreName === genreName
								).id
						)
				  )
				: new Set()
		);
	}, [song, id, genresList]);

	const handleOptionClick = (e) => {
		setGenres((prevGenres) => prevGenres.add(+e.target.value));
	};

	const deleteSongButton = (e) => {
		dispatch(deleteSongThunk(id));
		dispatch(deleteUserSong(id));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const imageData = new FormData();
		imageData.set("image", albumImage);
		const data = {
			songUrl: song.songUrl,
			title,
			artist,
			album,
			genres: [...genres],
		};
		await dispatch(editSongThunk(data, id, imageData));
	};

	// for testing purposes only
	useEffect(() => {
		dispatch(getUserSongsThunk(user?.id));
	}, [dispatch, user]);

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					{errors.map((error, ind) => (
						<div key={ind}>{error}</div>
					))}
				</div>
				<img
					src={
						albumImage
							? URL.createObjectURL(albumImage)
							: song?.albumImageUrl
					}
					alt="Album Cover"
				/>
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
			<button onClick={deleteSongButton}>
				Delicately caress and MURDER?
			</button>
		</div>
	);
};

export default EditSongForm;

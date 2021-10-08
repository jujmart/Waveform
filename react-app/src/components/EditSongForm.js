import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { getAllGenresThunk } from "../store/genre";
import { getOneSongThunk, editSongThunk } from "../store/songs";
// import { getUserSongsThunk } from "../store/userMusicInfo";
import "./css/edit-song-form.css";

const EditSongForm = () => {
	const { id } = useParams();
	const song = useSelector((state) => state.songs[id]);
	const [errors, setErrors] = useState([]);
	const [title, setTitle] = useState("");
	const [artist, setArtist] = useState("");
	const [album, setAlbum] = useState("");
	const [albumImage, setAlbumImage] = useState(null);
	const [genres, setGenres] = useState([]);
	const user = useSelector((state) => state.session.user);
	const genresList = useSelector((state) => state.genres);
	const dispatch = useDispatch();
	const history = useHistory();

	const imageFileEndings = ["pdf", "png", "jpg", "jpeg", "gif"];

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
		if (genresList.length) {
			setGenres(
				song?.genres
					? song.genres.map(
							(genreName) =>
								genresList.find(
									(genre) => genre.genreName === genreName
								).id
					  )
					: []
			);
		}
	}, [song, id, genresList]);

	const handleOptionClick = (e) => {
		setGenres((prevGenres) => [...prevGenres, +e.target.value]);
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
		if (albumImage) {
			const imageNameSplit = albumImage.name.split(".");
			const imageExt = imageNameSplit[imageNameSplit.length - 1];
			if (!imageFileEndings.includes(imageExt)) {
				setErrors([
					"Album Image: You must upload a valid image file type",
				]);
				return;
			}
		}
		const response = await dispatch(editSongThunk(data, id, imageData));
		if (response) {
			setErrors(response.errors);
		} else {
			history.push(`/users/${user.id}`);
		}
	};

	const deleteGenreOnClick = (e) => {
		e.preventDefault();

		const idx = genres.indexOf(+e.target.value);

		setGenres((prevGenres) =>
			prevGenres.slice(0, idx).concat(prevGenres.slice(idx + 1))
		);
	};

	// // for testing purposes only
	// useEffect(() => {
	// 	dispatch(getUserSongsThunk(user?.id));
	// }, [dispatch, user]);

	if (song && user.id !== song.userId) {
		return <Redirect to={`/users/${user.id}`} />;
	}

	return (
		<div id="edit-song-form-container_div">
			<div id ='current-info-div'>
				<h2 id='edit-song-h2'>Edit Song</h2>
				<img
				id='edit-song-img'
					src={
						albumImage
							? URL.createObjectURL(albumImage)
							: song?.albumImageUrl
					}
					alt="Album Cover"
				/>
			<div id="selected-genre-container_div">
				{genres.length > 0 &&
					genres.map((genreId) => (
						<div className="remove-genre_div" key={genreId}>
							<p className='remove-genre_p'>{genresList[genreId - 1].genreName}</p>
							<button class='remove-genre_btn'
								onClick={deleteGenreOnClick}
								value={genreId}
							>
								✖️
							</button>
						</div>
					))}
				</div>
			</div>
			<form id='edit-song-form' onSubmit={handleSubmit}>

					<label className='edit-form-label' htmlFor="title">Title</label>
					<input
						className='edit-form-input'
						name="title"
						type="text"
						placeholder="title"
						value={title}
						required
						onChange={(e) => {
							setTitle(e.target.value);
						}}
					/>


					<label className='edit-form-label' htmlFor="artist">Artist</label>
					<input
						className='edit-form-input'
						name="artist"
						type="text"
						placeholder="artist"
						value={artist}
						onChange={(e) => {
							setArtist(e.target.value);
						}}
					/>


					<label className='edit-form-label' htmlFor="album">Album</label>
					<input
						className='edit-form-input'
						name="album"
						type="text"
						placeholder="album"
						value={album}
						onChange={(e) => {
							setAlbum(e.target.value);
						}}
					/>

					<label className='edit-form-label' htmlFor="albumImage">Album Image</label>
					<input
						className='edit-form-input'
						type="file"
						accept=".pdf,.png,.jpg,.jpeg,.gif"
						name="albumImage"
						onChange={(e) => {
							setAlbumImage(e.target.files[0]);
						}}
					/>

					<label className='edit-form-label' htmlFor="genres">Genres</label>
					<select
						className='edit-form-input'
						name="genres"
						onChange={(e) => handleOptionClick(e)}
						defaultValue="Select Genre"
					>
						<option  disabled>Select Genre</option>
						{genresList.map((genre) => (
							<option key={genre.id} value={genre.id}>
								{genre.genreName}
							</option>
						))}
					</select>

					<div id='errors'>
					{errors.map((error, ind) => (
						<div key={ind}>{error}</div>
					))}
				</div>

				<button id='edit-form-submit' type="submit">Submit</button>
			</form>
		</div>
	);
};

export default EditSongForm;

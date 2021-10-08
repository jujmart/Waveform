import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllGenresThunk } from "../store/genre";
import { uploadSongThunk } from "../store/songs";
import { postUserSong } from "../store/userMusicInfo";
import "./css/song-form.css";

const SongForm = () => {
	const [errors, setErrors] = useState([]);
	const [songUrl, setSongUrl] = useState(null);
	const [title, setTitle] = useState("");
	const [artist, setArtist] = useState(null);
	const [album, setAlbum] = useState(null);
	const [albumImage, setAlbumImage] = useState("");
	const [genres, setGenres] = useState([]);
	const [disabledSubmitButton, setDisabledSubmitButton] = useState(false);
	const user = useSelector((state) => state.session.user);
	const genresList = useSelector((state) => state.genres);
	const dispatch = useDispatch();
	const history = useHistory();

	const audioFileEndings = [
		".m4a",
		".flac",
		".mp3",
		".mp4",
		".wav",
		".wma",
		".aac",
	];

	const imageFileEndings = ["pdf", "png", "jpg", "jpeg", "gif"];

	useEffect(() => {
		dispatch(getAllGenresThunk());
	}, [dispatch]);

	const handleOptionClick = (e) => {
		setGenres((prevGenres) => [...prevGenres, +e.target.value]);
	};

	const deleteGenreOnClick = (e) => {
		e.preventDefault();

		const idx = genres.indexOf(+e.target.value);
		setGenres((prevGenres) =>
			prevGenres.slice(0, idx).concat(prevGenres.slice(idx + 1))
		);
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
			genres,
		};
		if (songUrl) {
			const songNameSplit = songUrl.name.split(".");
			const songExt = songNameSplit[songNameSplit.length - 1];
			if (audioFileEndings.includes("." + songExt)) {
				if (albumImage) {
					const imageNameSplit = albumImage.name.split(".");
					const imageExt = imageNameSplit[imageNameSplit.length - 1];
					if (imageFileEndings.includes(imageExt)) {
						setDisabledSubmitButton(true);
						const response = await dispatch(
							uploadSongThunk(data, songData)
						);
						if (response.errors) {
							setErrors(response.errors);
							setDisabledSubmitButton(false);
						} else {
							await dispatch(postUserSong(response.songId));
							history.push(`/users/${user.id}`);
						}
					} else {
						setErrors([
							"Album Image: You must upload a valid image file type",
						]);
					}
				} else {
					setDisabledSubmitButton(true);
					const response = await dispatch(
						uploadSongThunk(data, songData)
					);
					if (response.errors) {
						setErrors(response.errors);
						setDisabledSubmitButton(false);
					} else {
						await dispatch(postUserSong(response.songId));
						history.push(`/users/${user.id}`);
					}
				}
			} else {
				setErrors([
					"Audio File: You must upload a valid song file type",
				]);
			}
		} else {
			setErrors(["Audio File: You must upload a song"]);
		}
	};

	return (
		<div id="song-form-container_div">
			<div id="song-form-dynamic-creation_div">
				<img
					id="display-album_img"
					src={
						albumImage
							? URL.createObjectURL(albumImage)
							: "https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Album-Images/Seeder1-NoAlbumImage.jpeg"
					}
					alt="Album Cover"
				/>
				<div id="display_div">
					{/* <h2 id='title-label'>Title</h2> */}
					<h2 id="dynamic-title">{title}</h2>
					{/* <h2 id='artist-label'>Artist</h2> */}
					<h3 id="dynamic-artist">{artist}</h3>
					{/* <h3 id='album-label'>Album</h3> */}
					<h3 id="dynamic-album">{album}</h3>
					{/* <h3 id='genres-label'>Genres:</h3> */}
					<div id="selected-genre-container_div">
						{genres.length > 0 &&
							genres.map((genreId) => (
								<div className="remove-genre_div" key={genreId}>
									<p className="remove-genre_p">
										{genresList[genreId - 1].genreName}
									</p>
									<button
										className="remove-genre_btn"
										key={genreId}
										onClick={deleteGenreOnClick}
										value={genreId}
									>
										✖️
									</button>
								</div>
							))}
					</div>
				</div>
			</div>

			<form id="song-form_form" onSubmit={handleSubmit}>
				{errors.map((error, ind) => (
					<div className='songform-errors' key={ind}>{error}</div>
				))}

				<label htmlFor="songUrl">Audio File</label>
				<input
					type="file"
					accept=".m4a,.flac,.mp3,.mp4,.wav,.wma,.aac"
					name="songUrl"
					onChange={(e) => {
						setSongUrl(e.target.files[0]);
					}}
				/>

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

				<label htmlFor="albumImage">Album Image</label>
				<input
					type="file"
					accept=".pdf,.png,.jpg,.jpeg,.gif"
					name="albumImage"
					onChange={(e) => {
						setAlbumImage(e.target.files[0]);
					}}
				/>

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

				<button
					id="song-form_submit-btn"
					type="submit"
					disabled={disabledSubmitButton}
				>
					{!disabledSubmitButton ? "Submit" : "loading..."}
				</button>
			</form>
		</div>
	);
};

export default SongForm;

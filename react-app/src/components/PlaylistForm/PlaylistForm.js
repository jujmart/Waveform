import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPlaylistThunk } from "../../store/playlist";
import { addPlaylist } from "../../store/recent";
import { postUserPlaylist } from "../../store/userMusicInfo";

const PlaylistForm = ({ setShowModal }) => {
	const [errors, setErrors] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = {
			title,
			description,
		};
		const playlistData = await dispatch(createPlaylistThunk(data));
		if (playlistData.errors) {
			setErrors(playlistData.errors);
		} else {
			await dispatch(postUserPlaylist(playlistData.playlist.id));
			await dispatch(addPlaylist(playlistData.playlist.id));
			setShowModal(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="modal-form">
			{errors.length > 0 && (
				<div className="modal-erros-div">
					{errors.map((error, ind) => (
						<div key={ind} className="modal-form_one-error">
							{error}
						</div>
					))}
				</div>
			)}
			<div>
				<div>
					<label htmlFor="Title">Title</label>
				</div>
				<input
					name="Title"
					type="text"
					placeholder="Title"
					value={title}
					required
					onChange={(e) => {
						setTitle(e.target.value);
					}}
				/>
			</div>
			<div>
				<div>
					<label htmlFor="description">Description</label>
				</div>
				<textarea
					name="description"
					placeholder="Description"
					value={description}
					onChange={(e) => {
						setDescription(e.target.value);
					}}
				/>
			</div>
			<button type="submit">Submit</button>
		</form>
	);
};

export default PlaylistForm;

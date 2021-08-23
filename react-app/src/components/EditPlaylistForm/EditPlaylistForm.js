import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { editPlaylistThunk, getOnePlaylistThunk } from "../../store/playlist";

const EditPlaylistForm = ({ setShowModal }) => {
	const { id } = useParams();
	const [errors, setErrors] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const playlist = useSelector((state) => state.playlists[id]);
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = {
			title,
			description,
		};

		const editData = await dispatch(editPlaylistThunk(data, id));
		if (editData) {
			setErrors(editData.errors);
		} else {
			setShowModal(false);
		}
	};

	useEffect(() => {
		if (!playlist) {
			dispatch(getOnePlaylistThunk(id));
		}
	}, [dispatch, playlist, id]);

	useEffect(() => {
		setTitle(playlist?.title);
		setDescription(playlist?.description);
	}, [playlist]);

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

export default EditPlaylistForm;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPlaylistThunk } from "../../store/playlist";

const PlaylistForm = () => {
	const [errors, setErrors] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = {
			title,
			description,
		};
		await dispatch(createPlaylistThunk(data));
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>
			<div>
				<label htmlFor="Title">Title</label>
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
				<label htmlFor="description">Description</label>
				<textarea
					name="description"
					placeholder="Description"
					value={description}
					required
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

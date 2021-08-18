import { bindActionCreators } from "redux";

// constants
const GET_ALL_SONGS = "songs/GET_ALL_SONGS";

const getAllSongs = (songs) => ({
	type: GET_ALL_SONGS,
	payload: songs,
});

export const getAllSongsThunk = (payload) => async (dispatch) => {
	const response = await fetch("/api/songs/");

	if (response.ok) {
		const { songs } = await response.json();
		if (songs.errors) {
			return;
		}
		dispatch(getAllSongs(songs));
	}
};

export const uploadSongThunk = (payload) => async (dispatch) => {
	const response = await fetch("/api/songs/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
	}
};

// If we change edit to modal, we need dispatch to store for update
export const editSongThunk = (payload, id) => async (dispatch) => {
	const response = await fetch(`/api/songs/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload)
	})

	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
	}
}

const initialState = {};

export default function songsReducer(state = initialState, action) {
	Object.freeze(state);
	switch (action.type) {
		case GET_ALL_SONGS:
			const newState = {};
			action.payload.forEach((song) => {
				newState[song.id] = song;
			});
			return newState;
		default:
			return state;
	}
}

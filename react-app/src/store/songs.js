// constants
const GET_ALL_SONGS = "songs/GET_ALL_SONGS";
const DELETE_SONG = "songs/DELETE_SONG";
const SET_PLAYLIST_SONGS = "songs/SET_PLAYLIST_SONGS";

const getAllSongs = (songs) => ({
	type: GET_ALL_SONGS,
	payload: songs,
});

const deleteSong = (id) => ({
	type: DELETE_SONG,
	payload: id,
});

const setPlaylistSongs = (songs) => ({
	type: SET_PLAYLIST_SONGS,
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
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
	}
};

export const deleteSongThunk = (id) => async (dispatch) => {
	const response = await fetch(`/api/songs/${id}`, {
		method: "DELETE",
	});

	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(deleteSong(id));
	}
};

export const setPlaylistSongsThunk = (payload) => async (dispatch) => {
	const response = await fetch("/api/playlist-songs/", {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const { songs } = await response.json();
		if (songs.errors) {
			return;
		}
		dispatch(setPlaylistSongs(songs));
	}
};

const initialState = {};

export default function songsReducer(state = initialState, action) {
	Object.freeze(state);
	switch (action.type) {
		case GET_ALL_SONGS:
			const newGetState = {};
			action.payload.forEach((song) => {
				newGetState[song.id] = song;
			});
			return newGetState;
		case SET_PLAYLIST_SONGS:
			const newSetState = { ...state };
			action.payload.forEach((song) => {
				newGetState[song.id] = song;
			});
			return newSetState;
		case DELETE_SONG:
			const newDeleteState = { ...state };
			delete newDeleteState[action.payload];
			return newDeleteState;
		default:
			return state;
	}
}

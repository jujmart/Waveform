// constants
const GET_ALL_PLAYLISTS = "playlists/GET_ALL_PLAYLISTS";
const DELETE_PLAYLIST = "playlists/DELETE_PLAYLIST";
const CREATE_PLAYLIST = "playlists/CREATE_PLAYLIST";

const createPlaylist = (playlist) => ({
	type: CREATE_PLAYLIST,
	payload: playlist,
});

// const getAllSongs = (songs) => ({
// 	type: GET_ALL_SONGS,
// 	payload: songs,
// });

// const deleteSong = (id) => ({
// 	type: DELETE_SONG,
// 	payload: id,
// });

export const createPlaylistThunk = (payload) => async (dispatch) => {
	const response = await fetch("/api/playlists/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const { playlist } = await response.json();
		if (playlist.errors) {
			return;
		}
		dispatch(createPlaylist(playlist));
	}
};

// export const getAllSongsThunk = (payload) => async (dispatch) => {
// 	const response = await fetch("/api/songs/");

// 	if (response.ok) {
// 		const { songs } = await response.json();
// 		if (songs.errors) {
// 			return;
// 		}
// 		dispatch(getAllSongs(songs));
// 	}
// };

// export const uploadSongThunk = (payload) => async (dispatch) => {
// 	const response = await fetch("/api/songs/", {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(payload),
// 	});

// 	if (response.ok) {
// 		const data = await response.json();
// 		if (data.errors) {
// 			return;
// 		}
// 	}
// };

// // If we change edit to modal, we need dispatch to store for update
// export const editSongThunk = (payload, id) => async (dispatch) => {
// 	const response = await fetch(`/api/songs/${id}`, {
// 		method: "PUT",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(payload),
// 	});

// 	if (response.ok) {
// 		const data = await response.json();
// 		if (data.errors) {
// 			return;
// 		}
// 	}
// };

// export const deleteSongThunk = (id) => async (dispatch) => {
// 	const response = await fetch(`/api/songs/${id}`, {
// 		method: "DELETE",
// 	});

// 	if (response.ok) {
// 		const data = await response.json();
// 		if (data.errors) {
// 			return;
// 		}

// 		dispatch(deleteSong(id));
// 	}
// };

const initialState = {};

export default function playlistsReducer(state = initialState, action) {
	Object.freeze(state);
	switch (action.type) {
		case CREATE_PLAYLIST:
			const newCreateState = { ...state };
			newCreateState[action.payload.id] = action.payload;
			return newCreateState;
		// case DELETE_SONG:
		// 	const newDeleteState = { ...state };
		// 	delete newDeleteState[action.payload];
		// 	return newDeleteState;
		default:
			return state;
	}
}

// constants
const CREATE_PLAYLIST = "playlists/CREATE_PLAYLIST";
const DELETE_PLAYLIST = "playlists/DELETE_PLAYLIST";
const ADD_PLAYLISTS = "playlists/ADD_PLAYLISTS";
const ADD_SONG = "playlists/ADD_SONG";

const createPlaylist = (playlist) => ({
	type: CREATE_PLAYLIST,
	payload: playlist,
});

const deletePlaylist = (id) => ({
	type: DELETE_PLAYLIST,
	payload: id,
});

const addPlaylists = (playlists) => ({
	type: ADD_PLAYLISTS,
	payload: playlists,
});

const addSongToPlaylist = (songId, playlistId) => ({
	type: ADD_SONG,
	songId,
	playlistId,
});

export const populatePlaylistFromArrThunk = (payload) => async (dispatch) => {
	const response = await fetch("/api/playlists/", {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const { playlists } = await response.json();
		if (playlists.errors) {
			return;
		}
		dispatch(addPlaylists(playlists));
	}
};

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

export const editPlaylistThunk = (payload, id) => async (dispatch) => {
	const response = await fetch(`/api/playlists/${id}`, {
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
		dispatch(createPlaylist(data.playlist));
	}
};

export const getOnePlaylistThunk = (id) => async (dispatch) => {
	const response = await fetch(`/api/playlists/${id}`);

	if (response.ok) {
		const { playlist } = await response.json();
		if (playlist.errors) {
			return;
		}
		dispatch(createPlaylist(playlist));
	} else {
		return response;
	}
};

export const deletePlaylistThunk = (id) => async (dispatch) => {
	const response = await fetch(`/api/playlists/${id}`, {
		method: "DELETE",
	});

	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		dispatch(deletePlaylist(data.playlistId));
	}
};

export const addSongToPlaylistThunk =
	(songId, playlistId) => async (dispatch) => {
		const response = await fetch(`/api/playlists/addSong`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ songId, playlistId }),
		});

		if (response.ok) {
			const data = await response.json();
			if (data.errors) {
				return;
			}
			dispatch(addSongToPlaylist(+songId, playlistId));
		}
	};

const initialState = {};

export default function playlistsReducer(state = initialState, action) {
	Object.freeze(state);
	switch (action.type) {
		case CREATE_PLAYLIST:
			const newCreateState = { ...state };
			newCreateState[action.payload.id] = action.payload;
			return newCreateState;
		case DELETE_PLAYLIST:
			const newDeleteState = { ...state };
			delete newDeleteState[action.payload];
			return newDeleteState;
		case ADD_PLAYLISTS:
			const newAddState = { ...state };
			action.payload.forEach((playlist) => {
				newAddState[playlist.id] = playlist;
			});
			return newAddState;
		case ADD_SONG:
			const newAddSongState = { ...state };
			newAddSongState[action.playlistId].songs = [
				...state[action.playlistId].songs,
				action.songId,
			];
			return newAddSongState;
		default:
			return state;
	}
}

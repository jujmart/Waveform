// constants
const CREATE_PLAYLIST = "playlists/CREATE_PLAYLIST";
const DELETE_PLAYLIST = "playlists/DELETE_PLAYLIST";
const ADD_PLAYLISTS = "playlists/ADD_PLAYLISTS";
const ADD_SONG = "playlists/ADD_SONG";
const REMOVE_SONG = "playlists/REMOVE_SONG";

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

const removeSongFromPlaylist = (songId, playlistId) => ({
	type: REMOVE_SONG,
	songId,
	playlistId,
});

export const getAllPlaylistsThunk = (limit) => async (dispatch) => {
	const response = await fetch(`/api/playlists/get/${limit}`);

	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		dispatch(addPlaylists(data.playlists));
		return data.playlists;
	}
};

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
		return playlist.id;
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
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
		dispatch(createPlaylist(data.playlist));
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

export const getPlaylistUserThunk = (playlistId) => async () => {
	const response = await fetch(`/api/playlists/${playlistId}/users`);

	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		return data.user;
	}
};

export const removeSongFromPlaylistThunk =
	(playlistId, songId) => async (dispatch) => {
		const response = await fetch(`/api/playlists/removeSong`, {
			method: "DELETE",
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
			dispatch(removeSongFromPlaylist(+songId, playlistId));
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
			if (!state[action.playlistId].songs.includes(action.songId)) {
				newAddSongState[action.playlistId].songs = [
					...state[action.playlistId].songs,
					action.songId,
				];
			}
			return newAddSongState;
		case REMOVE_SONG:
			const newRemoveSongState = { ...state };
			newRemoveSongState[action.playlistId].songs = [
				...state[action.playlistId].songs,
			];
			const index = newRemoveSongState[action.playlistId].songs.indexOf(
				action.songId
			);
			newRemoveSongState[action.playlistId].songs.splice(index, 1);
			return newRemoveSongState;
		default:
			return state;
	}
}

import { addPlaylists } from "./playlist";
import { setPlaylistSongs } from "./songs";

const ADD_RECENT_SONGS = "recent/ADD_RECENT_SONGS";
const ADD_RECENT_PLAYLISTS = "recent/ADD_RECENT_PLAYLISTS";

const addRecentSongs = (songIds) => ({
	type: ADD_RECENT_SONGS,
	songIds,
});

const addRecentPlaylists = (playlistIds) => ({
	type: ADD_RECENT_PLAYLISTS,
	playlistIds,
});

export const getRecentSongsThunk = () => async (dispatch) => {
	const response = await fetch("/api/songs/");

	if (response.ok) {
		const recent = await response.json();
		if (recent.errors) {
			return;
		}
		const songIds = recent.songs.map((song) => song.id);
		dispatch(addRecentSongs(songIds));
		dispatch(setPlaylistSongs(recent.songs));
	}
};

export const getRecentPlaylistsThunk = () => async (dispatch) => {
	const response = await fetch("/api/playlists/get/5");

	if (response.ok) {
		const recent = await response.json();
		if (recent.errors) {
			return;
		}
		const playlistIds = recent.playlists.map((playlist) => playlist.id);
		dispatch(addRecentPlaylists(playlistIds));
		dispatch(addPlaylists(recent.playlists));
	}
};

const initialState = {
	songs: [],
	playlists: [],
};

export default function recentReducer(state = initialState, action) {
	Object.freeze(state);
	switch (action.type) {
		case ADD_RECENT_SONGS:
			return {
				...state,
				songs: [...action.songIds],
			};
		case ADD_RECENT_PLAYLISTS:
			return {
				...state,
				playlists: [...action.playlistIds],
			};
		default:
			return state;
	}
}

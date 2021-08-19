// constants
const GET_USER_SONGS = "userMusicInfo/GET_USER_SONGS";
const DELETE_USER_SONG = "userMusicInfo/DELETE_USER_SONG";
const POST_USER_SONG = "userMusicInfo/POST_USER_SONG";
const GET_USER_PLAYLISTS = "userMusicInfo/GET_USER_PLAYLISTS";
const DELETE_USER_PLAYLIST = "userMusicInfo/DELETE_USER_PLAYLIST";
const POST_USER_PLAYLIST = "userMusicInfo/POST_USER_PLAYLIST";

const getUserSongs = (songs) => ({
	type: GET_USER_SONGS,
	payload: songs,
});

export const deleteUserSong = (id) => ({
	type: DELETE_USER_SONG,
	payload: id,
});

export const postUserSong = (id) => ({
	type: POST_USER_SONG,
	payload: id,
});

const getUserPlaylists = (playlists) => ({
	type: GET_USER_PLAYLISTS,
	payload: playlists,
});

export const deleteUserPlaylist = (id) => ({
	type: DELETE_USER_PLAYLIST,
	payload: id,
});

export const postUserPlaylist = (id) => ({
	type: POST_USER_PLAYLIST,
	payload: id,
});

export const getUserSongsThunk = (id) => async (dispatch) => {
	const response = await fetch(`/api/songs/users/${id}`);

	if (response.ok) {
		const { songs } = await response.json();
		if (songs.errors) {
			return;
		}
		dispatch(getUserSongs(songs));
	}
};

export const getUserPlaylistsThunk = (id) => async (dispatch) => {
	const response = await fetch(`/api/playlists/users/${id}`);

	if (response.ok) {
		const { playlists } = await response.json();
		if (playlists.errors) {
			return;
		}
		dispatch(getUserPlaylists(playlists));
	}
};

const initialState = { playlists: [], songs: [] };

export default function songsReducer(state = initialState, action) {
	Object.freeze(state);
	switch (action.type) {
		case GET_USER_SONGS:
			const newGetUserSongState = { ...state };
			newGetUserSongState.songs = action.payload;
			return newGetUserSongState;
		case DELETE_USER_SONG:
			const newDeleteUserSongState = { ...state };
			newDeleteUserSongState.songs = [...state.songs];
			const songIdIndex = newDeleteUserSongState.songs.indexOf(
				+action.payload
			);
			if (songIdIndex !== -1) {
				newDeleteUserSongState.songs.splice(songIdIndex, 1);
			}
			return newDeleteUserSongState;
		case POST_USER_SONG:
			const newPostUserSongState = { ...state };
			newPostUserSongState.songs = [...state.songs, action.payload];
			return newPostUserSongState;
		case GET_USER_PLAYLISTS:
			const newGetUserPlaylistState = { ...state };
			newGetUserPlaylistState.playlists = action.payload;
			return newGetUserPlaylistState;
		case DELETE_USER_PLAYLIST:
			const newDeleteUserPlaylistState = { ...state };
			newDeleteUserPlaylistState.playlists = [...state.playlists];
			const playlistIdIndex =
				newDeleteUserPlaylistState.playlists.indexOf(+action.payload);
			if (playlistIdIndex !== -1) {
				newDeleteUserPlaylistState.playlists.splice(playlistIdIndex, 1);
			}
			return newDeleteUserPlaylistState;
		case POST_USER_PLAYLIST:
			const newPostUserPlaylistState = { ...state };
			newPostUserPlaylistState.playlists = [
				...state.playlists,
				action.payload,
			];
			return newPostUserPlaylistState;
		default:
			return state;
	}
}

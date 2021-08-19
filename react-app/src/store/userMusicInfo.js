// constants
const GET_USER_SONGS = "userMusicInfo/GET_USER_SONGS";
const DELETE_USER_SONG = "userMusicInfo/DELETE_USER_SONG";
const POST_USER_SONG = "userMusicInfo/POST_USER_SONG";

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
			const idIndex = newDeleteUserSongState.songs.indexOf(
				+action.payload
			);
			if (idIndex !== -1) {
				newDeleteUserSongState.songs.splice(idIndex, 1);
			}
			return newDeleteUserSongState;
		case POST_USER_SONG:
			const newPostUserSongState = { ...state };
			newPostUserSongState.songs = [...state.songs, action.payload];
			return newPostUserSongState;
		default:
			return state;
	}
}

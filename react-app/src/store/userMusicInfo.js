// constants
const GET_USER_SONGS = "userMusicInfo/GET_USER_SONGS";

const getUserSongs = (songs) => ({
	type: GET_USER_SONGS,
	payload: songs,
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
		default:
			return state;
	}
}

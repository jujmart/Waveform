import { addPlaylists } from "./playlist";
import { setPlaylistSongs } from "./songs";
import { addSomeUsers } from "./users";

const ADD_SEARCH_OUTPUT = "search/ADD_SEARCH_OUTPUT";

const addSearchOutput = (songs, playlists, users) => ({
	type: ADD_SEARCH_OUTPUT,
	songs,
	playlists,
	users,
});

export const searchThunk = (searchInput) => async (dispatch) => {
	const response = await fetch("/api/search/", {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ searchInput }),
	});

	if (response.ok) {
		const searchOutput = await response.json();
		if (searchOutput.errors) {
			return;
		}
		const { songs, playlists, users, songObjs, playlistObjs, userObjs } =
			searchOutput;
		dispatch(addSearchOutput(songs, playlists, users));
		dispatch(setPlaylistSongs(songObjs));
		dispatch(addPlaylists(playlistObjs));
		dispatch(addSomeUsers(userObjs));
	}
};

const initialState = {
	songs: [],
	playlists: [],
	users: [],
};

export default function searchReducer(state = initialState, action) {
	Object.freeze(state);
	switch (action.type) {
		case ADD_SEARCH_OUTPUT:
			return {
				songs: [...action.songs],
				playlists: [...action.playlists],
				users: [...action.users],
			};

		default:
			return state;
	}
}

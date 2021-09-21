const ADD_SEARCH_OUTPUT = "search/ADD_SEARCH_OUTPUT";

const addSearchOutput = (songs, playlists, users, genres) => ({
	type: ADD_SEARCH_OUTPUT,
	songs,
	playlists,
	users,
	genres,
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
		const { songs, playlists, users, genres } = searchOutput;
		dispatch(addSearchOutput(songs, playlists, users, genres));
	}
};

const initialState = {
	songs: {},
	playlists: {},
	users: {},
	genres: {},
};

export default function searchReducer(state = initialState, action) {
	Object.freeze(state);
	switch (action.type) {
		case ADD_SEARCH_OUTPUT:
			const newAddState = {
				songs: {},
				playlists: {},
				users: {},
				genres: {},
			};
			newAddState.songs = action.songs;
			newAddState.playlists = action.playlists;
			newAddState.users = action.users;
			newAddState.genres = action.genres;
			return newAddState;
		default:
			return state;
	}
}

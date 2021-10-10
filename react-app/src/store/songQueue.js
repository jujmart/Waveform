// constants
const ADD_SONG_TO_QUEUE = "queue/ADD_SONG_TO_QUEUE"; //adds a song to the back of the queue
const REMOVE_SONG_FROM_QUEUE = "queue/REMOVE_SONG_FROM_QUEUE";
const ADD_PLAYLIST_TO_QUEUE = "queue/ADD_PLAYLIST_TO_QUEUE"; //will remove all songs form current queue and set new playlist as queue
const ADD_SONG_PRIORITY = "queue/ADD_SONG_PRIORITY"; // will add a song to the from of the queue and maintain original queue structure
const MOVE_TO_NEXT_SONG = "queue/MOVE_TO_NEXT_SONG";

export const addSong = (songId) => ({
	type: ADD_SONG_TO_QUEUE,
	songId,
});

export const moveToNextSong = () => ({
	type: MOVE_TO_NEXT_SONG,
});

export const removeSong = (songId, idx) => ({
	type: REMOVE_SONG_FROM_QUEUE,
	songId,
	idx,
});

export const addSongPriority = (songId) => ({
	type: ADD_SONG_PRIORITY,
	songId,
});

export const addPlaylist = (playlistIdsArr) => ({
	type: ADD_PLAYLIST_TO_QUEUE,
	payload: playlistIdsArr,
});

const initialState = [];

export default function songsReducer(state = initialState, action) {
	Object.freeze(state);
	switch (action.type) {
		case ADD_SONG_TO_QUEUE:
			return [...state, action.songId];
		case REMOVE_SONG_FROM_QUEUE:
			const newRemoveState = [...state];
			const removeIdx = action.idx;
			newRemoveState.splice(removeIdx, 1);
			return newRemoveState;
		case ADD_SONG_PRIORITY:
			return [action.songId, ...state];
		case ADD_PLAYLIST_TO_QUEUE:
			return [...action.payload];
		case MOVE_TO_NEXT_SONG:
			const newState = [...state];
			newState.shift();
			return newState;
		default:
			return state;
	}
}

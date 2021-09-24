import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import genresReducer from "./genre";
import songsReducer from "./songs";
import playlistsReducer from "./playlist";
import userMusicInfoReducer from "./userMusicInfo";
import usersReducer from "./users";
import searchReducer from "./search";
import queueReducer from "./songQueue";
import recentReducer from "./recent";

const rootReducer = combineReducers({
	session,
	genres: genresReducer,
	songs: songsReducer,
	playlists: playlistsReducer,
	userMusicInfo: userMusicInfoReducer,
	users: usersReducer,
	search: searchReducer,
	songQueue: queueReducer,
	recent: recentReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
	enhancer = applyMiddleware(thunk);
} else {
	const logger = require("redux-logger").default;
	const composeEnhancers =
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
	enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
	return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

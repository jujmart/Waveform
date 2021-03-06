import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import User from "./components/User";
import { authenticate } from "./store/session";
import SongForm from "./components/SongForm";
import EditSongForm from "./components/EditSongForm";
import DisplayPlaylist from "./components/Playlist";
import HomePage from "./components/Homepage";
import Search from "./components/Search/Search";
import SongQueue from "./components/SongQueue";
import PageNotFound from "./components/PageNotFound";

function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	const outerRef = useRef(null);

	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			setLoaded(true);
		})();
	}, [dispatch]);

	if (!loaded) {
		return null;
	}

	return (
		<BrowserRouter>
			{/* <div ref={outerRef} className="app">
				<Menu outerRef={outerRef} /> */}

			<NavBar />
			<Switch>
				<Route path="/login" exact={true}>
					<LoginForm />
				</Route>
				<Route path="/sign-up" exact={true}>
					<SignUpForm />
				</Route>
				<ProtectedRoute path="/users/:userId" exact={true}>
					<User />
				</ProtectedRoute>
				<ProtectedRoute path="/search" exact={true}>
					<Search />
				</ProtectedRoute>
				<Route path="/" exact={true}>
					<HomePage />
				</Route>
				<ProtectedRoute path="/song-form" exact={true}>
					<SongForm />
				</ProtectedRoute>
				<ProtectedRoute path="/edit-song-form/:id" exact={true}>
					<EditSongForm />
				</ProtectedRoute>
				<ProtectedRoute path="/playlists/:id" exact={true}>
					<DisplayPlaylist />
				</ProtectedRoute>
				<ProtectedRoute path="/queue" exact={true}>
					<SongQueue />
				</ProtectedRoute>
				<Route>
					<PageNotFound />
				</Route>
			</Switch>
			{/* </div> */}
		</BrowserRouter>
	);
}

export default App;

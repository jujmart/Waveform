import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUserPlaylistsThunk } from "../store/userMusicInfo";
import LogoutButton from "./auth/LogoutButton";
import PlaylistFormModal from "./PlaylistForm";

const NavBar = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);

	useEffect(() => {
		dispatch(getUserPlaylistsThunk(user?.id));
	}, [dispatch, user]);

	return (
		<nav>
			<div>
				<PlaylistFormModal />
			</div>
			<ul>
				<li>
					<NavLink to="/" exact={true} activeClassName="active">
						Home
					</NavLink>
				</li>
				<li>
					<NavLink to="/login" exact={true} activeClassName="active">
						Login
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/sign-up"
						exact={true}
						activeClassName="active"
					>
						Sign Up
					</NavLink>
				</li>
				<li>
					<NavLink to="/users" exact={true} activeClassName="active">
						Users
					</NavLink>
				</li>
				<li>
					<LogoutButton />
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;

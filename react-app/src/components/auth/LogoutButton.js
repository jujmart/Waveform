import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { removeAllQueue } from "../../store/songQueue";

const LogoutButton = () => {
	const dispatch = useDispatch();
	const onLogout = async (e) => {
		await dispatch(logout());
		await dispatch(removeAllQueue());
	};

	return (
		<p id="logout_button" onClick={onLogout}>
			Logout
		</p>
	);
};

export default LogoutButton;

// import React, {useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import ProtectedRoute from "./auth/ProtectedRoute";
import { Route } from "react-router-dom";
import HomePageLoggedOut from "../context/Homepage/Homepage-logged-out";
import HomePageLoggedIn from "../context/Homepage/Homepage-logged-in";
import "./css/home-page.css";

export default function HomePage() {
	return useSelector((state) => state.session.user) ? (
		<ProtectedRoute>
			<HomePageLoggedIn />
		</ProtectedRoute>
	) : (
		<Route>
			<HomePageLoggedOut />
		</Route>
	);
}

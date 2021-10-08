import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import "../css/sign-up-form.css";

const SignUpForm = () => {
	const [errors, setErrors] = useState([]);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [profilePic, setProfilePic] = useState(null);
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const onSignUp = async (e) => {
		e.preventDefault();
		if (password === repeatPassword) {
			let imageData = new FormData();
			imageData.set("image", profilePic);
			const data = await dispatch(
				signUp(username, email, password, imageData)
			);
			if (data) {
				setErrors(data);
			}
		} else {
			setErrors([
				"Password: Your password and repeat password don't match",
			]);
		}
	};

	const updateUsername = (e) => {
		setUsername(e.target.value);
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const updateRepeatPassword = (e) => {
		setRepeatPassword(e.target.value);
	};

	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<div id="signup-form_container">
			<div id="signup-form_profile-pic_container">
				<img
					src={profilePic ? URL.createObjectURL(profilePic) : ""}
					onError={(e)=>{e.target.onerror = null; e.target.src="https://spot-a-cloud.s3.us-east-2.amazonaws.com/AWS-Bucket/Profile-Photos/Seeder1-BlankPhoto.png"}}
					alt="Profile Pic"
					id="signup-form_profile-pic"
				/>
			</div>
			<form id="signup-form_form" onSubmit={onSignUp}>
				{/* <div> */}
				<label>User Name</label>
				<input
					id="signup-form_username"
					type="text"
					name="username"
					onChange={updateUsername}
					value={username}
					required={true}
				></input>
				{/* </div> */}
				{/* <div> */}
				<label>Email</label>
				<input
					id="signup-form_email"
					type="text"
					name="email"
					onChange={updateEmail}
					value={email}
					required={true}
				></input>
				{/* </div> */}
				{/* <div> */}
				<label>Password</label>
				<input
					id="signup-form_password"
					type="password"
					name="password"
					onChange={updatePassword}
					value={password}
					required={true}
				></input>
				{/* </div> */}
				{/* <div> */}
				<label>Repeat Password</label>
				<input
					id="sicgnup-form_repeat-password"
					type="password"
					name="repeat_password"
					onChange={updateRepeatPassword}
					value={repeatPassword}
					required={true}
				></input>
				{/* </div> */}
				{/* <div> */}
				<label htmlFor="profilePic">Profile Picture</label>
				<input
					id="signup-form_profile-pic"
					type="file"
					accept=".pdf,.png,.jpg,.jpeg,.gif"
					name="profilePic"
					onChange={(e) => {
						setProfilePic(e.target.files[0]);
					}}
				/>
				{/* </div> */}
				<div id="signup-form_errors">
					{errors.map((error, ind) => (
						<div key={ind}>{error}</div>
					))}
				</div>
				<button id="signup-form_submit-btn" type="submit">
					Sign Up
				</button>
			</form>
		</div>
	);
};

export default SignUpForm;

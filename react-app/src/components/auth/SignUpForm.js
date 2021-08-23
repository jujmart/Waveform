import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
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
		<form onSubmit={onSignUp}>
			<div>
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>
			<img src={profilePic ? URL.createObjectURL(profilePic) : ""} />
			<div>
				<label>User Name</label>
				<input
					type="text"
					name="username"
					onChange={updateUsername}
					value={username}
					required={true}
				></input>
			</div>
			<div>
				<label>Email</label>
				<input
					type="text"
					name="email"
					onChange={updateEmail}
					value={email}
					required={true}
				></input>
			</div>
			<div>
				<label>Password</label>
				<input
					type="password"
					name="password"
					onChange={updatePassword}
					value={password}
					required={true}
				></input>
			</div>
			<div>
				<label>Repeat Password</label>
				<input
					type="password"
					name="repeat_password"
					onChange={updateRepeatPassword}
					value={repeatPassword}
					required={true}
				></input>
			</div>
			<div>
				<label htmlFor="profilePic">Profile Picture (Optional)</label>
				<input
					type="file"
					accept=".pdf,.png,.jpg,.jpeg,.gif"
					name="profilePic"
					onChange={(e) => {
						setProfilePic(e.target.files[0]);
					}}
				/>
			</div>
			<button type="submit">Sign Up</button>
		</form>
  );
};

export default SignUpForm;

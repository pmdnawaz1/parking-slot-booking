import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // Import useDispatch
import Link from 'next/link';
import { login } from '../utils/api';
import { setUserId } from '../redux/slices/authSlice'; // Import action creator
import { useSelector } from 'react-redux';
import { selectUserId } from '../redux/slices/authSlice';

const Login = () => {
	const dispatch = useDispatch(); // Get dispatch function

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const response = await login(username, password);
			const data = await response.json();

			dispatch(setUserId(data.userId));
      localStorage.setItem('userId', data.userId);

			window.location.href = '/';
		} catch (error) {
			console.error('Login failed:', error);
			// Handle login failure (display error message, etc.)
		}
	};

	return (
		<div>
			<h1>Login Page</h1>
			<form onSubmit={handleLogin}>
				<label>
					<input
						value={username}
						onChange={handleUsernameChange}
						type="text"
						placeholder="username"
					/>
				</label>
				<br />
				<label>
					<input
						value={password}
						onChange={handlePasswordChange}
						type="password"
						placeholder="password"
					/>
				</label>
				<br />
				<button type="submit">login</button>
			</form>
			<Link href="/">Go to Home</Link>
		</div>
	);
};

export default Login;

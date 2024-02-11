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
			if (!username || !password) {
				alert('Please enter username and password');
				return;
			}
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
		<div className="flex justify-center items-center flex-col bg-slate-700">
			<h2 className="text-center m-8 p-4 text-2xl">
				Welcome to the Parking Slot Booking System
			</h2>
			<h1 className="text-center m-8 p-4 bg-slate-300 rounded">Login Page</h1>
			<form
				onSubmit={handleLogin}
				className="flex justify-center items-center flex-col w-1/4 bg-slate-400"
			>
				<label>
					Username:
					<input
						value={username}
						onChange={handleUsernameChange}
						type="text"
						placeholder="enter username"
						className="m-4 p-2"
					/>
				</label>
				<br />
				<label>
					Password:
					<input
						value={password}
						onChange={handlePasswordChange}
						type="password"
						placeholder="enter password"
						className="m-4 p-2"
					/>
				</label>
				<br />
				<button className="m-4 px-4 py-2 bg-red-300" type="submit">
					Login
				</button>
			</form>
			<Link className="m-4 px-4 py-2 bg-red-300" href="/">
				Go to Home
			</Link>
		</div>
	);
};

export default Login;

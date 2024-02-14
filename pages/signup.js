import React, { useState } from 'react';
import Link from 'next/link';
import { signUp } from '../utils/api';

const Signup = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleSignup = async (event) => {
		event.preventDefault();
		if (!username || !password || !email) {
			setError('Please enter username, email, and password');
			return;
		}
		setLoading(true);

		try {
			const response = await signUp(username, email, password);
			if (response.ok) {
				// Handle signup success
				window.location.href = '/login';
			} else {
				alert('Failed to sign up. Please try again.');
				setError('Failed to sign up. Please try again.');
			}
		} catch (error) {
			console.error('Signup error:', error);
			setError('An error occurred while signing up');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex justify-center items-center flex-col">
			<h2 className="text-center m-8 font-bold p-4 text-2xl">
				Welcome to the Parking Slot Booking System
			</h2>
			<h1 className="text-center m-8 p-4 text-2xl font-bold bg-white rounded shadow-md w-1/4">
				Signup Page
			</h1>
			<form
				onSubmit={handleSignup}
				className="flex justify-center rounded shadow-md items-center flex-col w-1/4"
			>
				<label className="text-black">
					Username:
					<input
						value={username}
						onChange={handleUsernameChange}
						type="text"
						placeholder="Enter username"
						className="m-4 p-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
						required
					/>
				</label>
				<br />
				<label className="text-black">
					Email:
					<input
						value={email}
						onChange={handleEmailChange}
						type="email"
						placeholder="Enter email"
						className="m-4 p-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
						required
					/>
				</label>
				<br />
				<label className="text-black">
					Password:
					<input
						value={password}
						onChange={handlePasswordChange}
						type="password"
						placeholder="Enter password"
						className="m-4 p-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
						required
					/>
				</label>
				<br />
				<button
					className="m-4 px-4 py-2 bg-black text-white rounded shadow-md"
					type="submit"
				>
					{loading ? 'Signing up...' : 'Sign Up'}
				</button>
				{error && <p className="text-red-500">{error}</p>}
			</form>
			<Link
				href="/"
				className="m-4 px-4 py-2 bg-black text-white rounded shadow-md"
			>
				Go to Home
			</Link>
		</div>
	);
};

export default Signup;

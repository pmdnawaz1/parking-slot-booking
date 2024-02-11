import React, { useState } from 'react';
import Link from 'next/link';
import { signUp } from '../utils/api';

const Signup = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleSignup = async (event) => {
		event.preventDefault();
    if(!username || !password){
      alert('Please enter username and password');
      return;
    }
		const response = await signUp(username, password);
		// Handle signup response
		window.location.href = '/';
	};
	return (
		<div className="flex justify-center items-center flex-col bg-slate-700">
			<h2 className="text-center m-8 p-4 text-2xl">
				Welcome to the Parking Slot Booking System
			</h2>
			<h1 className="text-center m-8 p-4 bg-slate-300 rounded">SignUp Page</h1>
			<form
				onSubmit={handleSignup}
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
					SignUp
				</button>
			</form>
			<Link className="m-4 px-4 py-2 bg-red-300" href="/">
				Go to Home
			</Link>
		</div>
	);
};

export default Signup;

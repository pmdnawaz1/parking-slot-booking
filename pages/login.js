import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { login } from '../utils/api';
import { useSelector } from 'react-redux';

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const router = useRouter();


	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleLogin = async (event) => {
		event.preventDefault();
		setLoading(true); // Set loading to true while login request is in progress

		try {
			const response = await login(username, password);
			if (response.ok) {
				const data = await response.json();
				localStorage.setItem('userId', data.user._id); // Store userId in localStorage
				localStorage.setItem('userEmail', data.user.email); // Store userId in localStorage
				router.push('/');
			} else {
				alert('Invalid username or password');
				setError('Invalid username or password');
			}
		} catch (error) {
			console.error('Login error:', error);
			setError('An error occurred while logging in');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex justify-center items-center flex-col">
			<h2 className="text-center m-8 p-4 font-bold  text-2xl">
				Welcome to the Parking Slot Booking System
			</h2>
			<h1 className="text-center m-8 p-4 bg-white rounded shadow-md text-2xl font-bold w-1/4">
				Login Page
			</h1>
			<form
				onSubmit={handleLogin}
				className="flex justify-center items-center shadow-md flex-col w-1/4"
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
					{loading ? 'Logging in...' : 'Login'}
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

export default Login;

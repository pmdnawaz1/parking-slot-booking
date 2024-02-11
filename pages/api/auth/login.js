// pages/api/auth/login.js

import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
	await dbConnect();

	if (req.method === 'POST') {
		const { username, password } = req.body;

		try {
			const user = await User.findOne({ username });

			if (!user || !(await user.comparePassword(password))) {
				return res.status(401).json({ message: 'Invalid credentials' });
			}

      res.send({ message: 'Login successful', userId: user._id.toString() });
		} catch (error) {
			console.error('Login error:', error);
			res.status(500).json({ message: 'Internal Server Error' });
		}
	} else {
		res.status(405).json({ message: 'Method Not Allowed' });
	}
}

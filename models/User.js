// models/User.js

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

if (mongoose.models.User) {
	// Use the existing model if it exists
	module.exports = mongoose.models.User;
} else {
	const userSchema = new mongoose.Schema({
		username: String,
		password: String,
		email: String,
	});

	// Hash the password before saving it to the database
	userSchema.pre('save', async function (next) {
		const user = this;
		if (!user.isModified('password')) return next();

		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(user.password, salt);
		user.password = hash;
		next();
	});

	// Compare the entered password with the stored hashed password
	userSchema.methods.comparePassword = async function (password) {
		return bcrypt.compare(password, this.password);
	};

	module.exports = mongoose.model('User', userSchema);
}

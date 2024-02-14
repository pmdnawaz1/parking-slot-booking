import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
	name: String,
	cityImage: String,
});

const City = mongoose.models.City || mongoose.model('City', citySchema);

export default City;

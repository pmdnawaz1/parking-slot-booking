import mongoose from 'mongoose';

if (mongoose.models.Slot) {
	module.exports = mongoose.models.Slot;
} else {
	const slotSchema = new mongoose.Schema({
		slotNumber: {
			type: Number,
			required: true,
			unique: true,
		},
		isBooked: {
			type: Boolean,
			default: false,
		},
		userId: String,
		bookingTime: {
			type: Date, // Time when the slot was booked
		},
		cityId: String,
		placeId: String,
	});

	const Slot = mongoose.model('Slot', slotSchema);

	module.exports = Slot;
}

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const model = new Schema({
	visitorName: {
		type: String
	},
	visitorMobile: {
		type: Number
	},
	visitorCheckIn: {
		type: String
	},
	visitorEmail: {
		type: String
	},
	visitorCheckOut: {
		type: String
	},
	hostName: {
		type: String
	},
	hostMobile: {
		type: String
	},
	hostEmail: {
		type: String
	},
	checkedOut: {
		type: Boolean,
		default: false
	},
	date: {
		type: String
	}
});

module.exports = new mongoose.model('Gate', model);

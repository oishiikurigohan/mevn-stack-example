var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		default: 0
	},
	gender: {
		type: String
	}
}, { collection: 'user' });

module.exports = mongoose.model('user', UserSchema);

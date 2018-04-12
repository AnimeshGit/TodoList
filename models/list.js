var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoListSchema = new Schema({
	name:{
        type: String,
        required:true
	},
	description:{
        type: String
	},
	status:{
        type: String,
        default:"Active"
	},
	created:{
        type: Date,
        default: Date.now
	}
});

module.exports = mongoose.model('list', TodoListSchema);
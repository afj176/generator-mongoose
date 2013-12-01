'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var fields = {
	title: { type: String },
	excerpt: { type: String },
	content: { type: String },
	active: { type: Boolean },
	created: { type: Date , default: Date.now } 
};

var postSchema = new Schema(fields);

module.exports = mongoose.model('Post', postSchema);
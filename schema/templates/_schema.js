'use strict';

var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var fields = {
<% schemaFields.forEach(function(field, index) {
	switch(field.split(":")[1]){
		case 'String':  %>	<%= field.split(":")[0] + ": { type: " + field.split(":")[1] + " }" %><% if(schemaFields.length - 1 !== index ){ %>,<%= "\n" %><% } break; case 'Number':  %>	<%= field.split(":")[0] + ": { type: " + field.split(":")[1] + " }" %><% if(schemaFields.length - 1 !== index ){ %>,<%= "\n" %><% } break; case 'Date':  %>	<%= field.split(":")[0] + ": { type: " + field.split(":")[1] + " , default: Date.now }" %><% if(schemaFields.length - 1 !== index ){ %>,<%= "\n" %><% } break; case 'Buffer':  %>	<%= field.split(":")[0] + ": { type: " + field.split(":")[1] + " }" %><% if(schemaFields.length - 1 !== index ){ %>,<%= "\n" %><% } break; case 'Boolean': %>	<%= field.split(":")[0] + ": { type: " + field.split(":")[1] + " }" %><% if(schemaFields.length - 1 !== index ){ %>,<%= "\n" %><% } break; case 'Mixed': %>	<%= field.split(":")[0] + ": { type: " + field.split(":")[1] + " }" %><% if(schemaFields.length - 1 !== index ){ %>,<%= "\n" %><% } break; case 'ObjectId': 	%>	<%= field.split(":")[0] + ": { type: " + field.split(":")[1] + " }" %><% if(schemaFields.length - 1 !== index ){ %>,<%= "\n" %><% } break; case 'Array': %>	<%= field.split(":")[0] + ": { type: " + field.split(":")[1] + " }" %><% if(schemaFields.length - 1 !== index ){ %>,<%= "\n" %><% } break; } }) %>
};

var <%= lowSchemaName %>Schema = new Schema(fields);

module.exports = mongoose.model('<%= capSchemaName %>', <%= lowSchemaName %>Schema);

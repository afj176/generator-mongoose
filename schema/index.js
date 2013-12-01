'use strict';
var util = require('util');
var request = require('request');
var yeoman = require('yeoman-generator');

var SchemaGenerator = module.exports = function SchemaGenerator(args, options, config) {
	// By calling `NamedBase` here, we get the argument to the subgenerator call
	// as `this.name`.
	yeoman.generators.NamedBase.apply(this, arguments);
	var schemaName = this.name.split("|")[0];
	var fieldsArgs = this.name.split("|")[1].split(',');
	var fields = [];
	fieldsArgs.forEach(function(field) {
		fields.push(field.split(":")[0]);
	});
	console.log("Your creating a schema for " + schemaName );
	console.log("With the fields: " + fields.join(','));
};

util.inherits(SchemaGenerator, yeoman.generators.NamedBase);

SchemaGenerator.prototype.files = function files() {
	var arg = this.name.split("|");
	var name = arg[0];
	var fields = arg[1].split(',');
	this.schemaName = name;
	this.schemaFields = (typeof fields != 'undefined') ? fields : ['title:String', 'content:String', 'created:Date'];
	this.mockData = "{}";
	this.mkdir('models');
	this.mkdir('test');
	this.mkdir('routes');
	this.template('_route.js', 'routes/' + name + '.js');
	this.template('_schema.js', 'models/' + name + '.js');

};

SchemaGenerator.prototype.schematic = function schematic() {
	this.mockData = '{}';
	var props = {};

	this.schemaFields.forEach(function(field, index) {
		var fld = field.split(":")[0];
		var type = field.split(":")[1];
		props[fld] = {};
		switch(type){
			case 'ObjectId':
				props[fld].type = type.toLowerCase();
				props[fld].ipsum = 'id';
			break;			
			case 'Date':
				props[fld].type = 'string';
				props[fld].format = 'date-time';
			break;
			case 'Array':
				props[fld].type = type.toLowerCase();
				props[fld].items = { "type": "string" };
			break;			
			case 'Number':
				props[fld].type = type.toLowerCase();
			break;
			case 'Boolean':
				props[fld].type = type.toLowerCase();
			break;
			case 'String':
				props[fld].type = type.toLowerCase();
				props[fld].ipsum = "sentence"
			break;
			case 'Buffer':
			case 'Mixed':
			break;			
		}
	});	

	var options = {
		uri: 'http://schematic-ipsum.herokuapp.com',
		method: 'POST',
		json: {
			"type": "object",
			"properties": props
		}
	};

	var cb = this.async();

	request(options, function(error, response, body) {
		console.log("starting request to schematic for test mock data...");
		if (!error && response.statusCode == 200) {
			this.mockData = JSON.stringify(body);
		}else{
			console.log("There was an issue reaching http://schematic-ipsum.herokuapp.com.");
			console.log("providing mock data for tests has failed, update you test file manually.");
		}
		cb();
	}.bind(this));
};

SchemaGenerator.prototype.loadTest = function loadTest() {
	var arg = this.name.split("|");
	var name = arg[0];	
	this.template('_test-schema.js', 'test/test-' + name + '.js');
};	

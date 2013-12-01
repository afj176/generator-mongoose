'use strict';

// Module dependencies.
var express = require('express'),
    path = require('path'),
    fs = require('fs');

var app = module.exports = exports.app = express();

app.locals.siteName = "<%= _.capitalize(appname) %>";

// Connect to database
var db = require('./config/db');

// Bootstrap models
var modelsPath = path.join(__dirname, 'models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

app.configure('development', function() {
  app.use(express.logger('dev'));
  app.use(express.errorHandler({ 
    dumpExceptions: true , showStack: true
  }));
  app.set('view options', { pretty: true });
});

app.configure('test', function() {
  app.use(express.logger('test'));
  app.set('view options', { pretty: true });
});

app.configure('production', function() {
  app.use(express.logger());
  app.use(express.errorHandler());
});

app.configure(function(){
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
	app.use(express.methodOverride());
  app.use(express.urlencoded());
  app.use(express.json());
  // Router needs to be last
	app.use(app.router);
});

// Bootstrap routes/api
var routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach(function(file) {
  require(routesPath + '/' + file)(app);
});

// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});
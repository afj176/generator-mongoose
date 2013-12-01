'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var MongooseGenerator = module.exports = function MongooseGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(MongooseGenerator, yeoman.generators.Base);

MongooseGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);


  var prompts = [
  {
    name: 'dbName',
    message: 'Database Name',
    default: 'myDb'
  },
  {
    name: 'dbHost',
    message: 'Database Host',
    default: 'localhost'
  },
  {
    name: 'dbUser',
    message: 'Database User'
  },
  {
    type: 'password',
    name: 'dbPassword',
    message: 'Database Password'
  },
  {
    name: 'dbPort',
    message: 'Database Port',
    default: 27017
  },        
  {
    type: 'confirm',
    name: 'useHeroku',
    message: 'Will you be using heroku?',
    default: true
  }
  ];

  this.prompt(prompts, function (props) {
    this.dbName = props.dbName;
    this.dbHost = props.dbHost;
    this.dbUser = props.dbUser;
    this.dbPassword = props.dbPassword;
    this.dbPort = props.dbPort;
    this.useHeroku = props.useHeroku;
    cb();
  }.bind(this));
};

MongooseGenerator.prototype.app = function app() {
  this.mkdir('test');
  this.mkdir('config');
  this.template('_package.json', 'package.json');
  this.template('_app.js', 'app.js');  
  this.template('_bower.json', 'bower.json');
};

MongooseGenerator.prototype.routes = function routes() {
  this.mkdir('routes');
  this.copy('routes/index.js', 'routes/index.js');
};

MongooseGenerator.prototype.publicFiles = function publicFiles() {
  this.mkdir('public');
  this.mkdir('public/css');
  this.copy('public/css/style.css', 'public/css/style.css');
  this.mkdir('public/js');
  this.copy('public/js/script.js', 'public/js/script.js');
};

MongooseGenerator.prototype.views = function views() {
  this.mkdir('views');
  this.copy('views/index.html', 'views/index.html');
};

MongooseGenerator.prototype.projectfiles = function projectfiles() {
  this.template('_README.md', 'README.md');
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};

MongooseGenerator.prototype.db = function db() {
  this.mkdir('models');
  this.template('config/_db.js', 'config/db.js');
  this.copy('models/post.js', 'models/post.js');
  this.copy('routes/post.js', 'routes/post.js');
};

MongooseGenerator.prototype.test = function test() {
  this.template('test/test-post.js', 'test/test-post.js');
};



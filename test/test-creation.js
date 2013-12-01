/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('mongoose generator', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('mongoose:app', ['../../app']);
            done();
        }.bind(this));
    });

    it('creates expected files', function (done) {
        var expected = [
            // add files you expect to exist here.
            'package.json',
            'app.js',
            'bower.json',
            'routes/index.js',
            'public/css/style.css',
            'public/js/script.js',
            'views/index.html',
            'README.md',
            '.editorconfig',
            '.jshintrc',
            'config/db.js',
            'models/post.js',
            'routes/post.js',
            'test/test-post.js'
        ];

        helpers.mockPrompt(this.app, {
            'dbName'    : 'test-yo-mongoose',
            'dbHost'    : 'localhost',
            'dbUser'    : '',
            'dbPassword': '',
            'dbPort'    : 27017,
            'useHeroku' : true           
        });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });

    describe('mongoose schema generator', function () {
        beforeEach(function (done) {
            helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
                if (err) {
                    return done(err);
                }

                this.app = helpers.createGenerator(
                    'mongoose:schema',
                    ['../../schema'],
                    'todo|complete:Boolean,created:Date,task:String'
                );
                done();
            }.bind(this));
        });

        it('creates expected files', function (done) {
            var expected = [
                // add files you expect to exist here.
                'routes/todo.js',
                'models/todo.js',
                'test/test-todo.js'
            ];

            helpers.mockPrompt(this.app, {});
            this.app.options['skip-install'] = true;
            this.app.run({}, function () {
                helpers.assertFiles(expected);
                done();
            });
        });
    });


});

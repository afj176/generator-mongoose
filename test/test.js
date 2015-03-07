/*global describe, beforeEach, it*/
'use strict';

var path    = require('path'),
    yg = require('yeoman-generator'),
    assert = require('assert'),
    helpers = yg.test,
    assertFile = yg.assert.file;

describe('🏃  running `yo mongoose`', function () {

    before(function (done) {

        helpers.run(path.join( __dirname, '../app'))
          .inDir(path.join( __dirname, './temp'))  // Clear the directory and set it as the CWD
          .withOptions({ mongoose: 'app' })            // Mock options passed in
          .withPrompt({
              'dbName'    : 'test-yo-mongoose',
              'dbHost'    : 'localhost',
              'dbUser'    : '',
              'dbPassword': '',
              'dbPort'    : 27017,
              'useHeroku' : true
          })
          .on('end', done);

    });

    describe('project generator', function () {

        it('can be imported without blowing up', function () {
            var app = require('../app');
            assert(app !== undefined);
        });

        it('creates express app, routes, model, and files', function (done) {
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

            assertFile(expected);
            done();
        });


    });



});

describe('🏃  running `yo mongoose:schema`', function () {


    before(function (done) {

        helpers.run(path.join( __dirname, '../schema'))
          .inDir(path.join( __dirname, './temp'))  // Clear the directory and set it as the CWD
          .withOptions({ mongoose: 'schema' })            // Mock options passed in
          .withArguments(['todo|complete:Boolean,created:Date,task:String'])
          .on('end', done);

    });

    describe('schema generator', function () {

        it('schema can be imported without blowing up', function () {
            var app = require('../schema');
            assert(app !== undefined);
        });

        it('created new route, model, and test for todo', function (done) {

            var expected = [
                // add files you expect to exist here.
                'routes/todo.js',
                'models/todo.js',
                'test/test-todo.js'
            ];
            assertFile(expected);
            done();

        })

    });



});

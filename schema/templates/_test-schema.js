var request = require('supertest'),
    express = require('express');

process.env.NODE_ENV = 'test';

var app = require('../app.js');
var _id = '';


describe('POST New <%= capSchemaName %>', function(){
  it('creates new <%= lowSchemaName %> and responds with json success message', function(done){
    request(app)
    .post('/api/<%= lowSchemaName %>')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({"<%= lowSchemaName %>": <%= mockData %>})
    .expect(201)
    .end(function(err, res) {
      if (err) {
        throw err;
      }
      _id = res.body._id;
      done();
    });
  });
});

describe('GET List of <%= capSchemaName %>s', function(){
  it('responds with a list of <%= lowSchemaName %> items in JSON', function(done){
    request(app)
    .get('/api/<%= lowSchemaName %>s')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});

describe('GET <%= capSchemaName %> by ID', function(){
  it('responds with a single <%= lowSchemaName %> item in JSON', function(done){
    request(app)
    .get('/api/<%= lowSchemaName %>/'+ _id )
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});


describe('PUT <%= capSchemaName %> by ID', function(){
  it('updates <%= lowSchemaName %> item in return JSON', function(done){
    request(app)
    .put('/api/<%= lowSchemaName %>/'+ _id )
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({ "<%= lowSchemaName %>": { "title": "Hell Is Where There Are No Robots" } })    
    .expect(200, done);
  });
});

describe('DELETE <%= capSchemaName %> by ID', function(){
  it('should delete <%= lowSchemaName %> and return 200 status code', function(done){
    request(app)
    .del('/api/<%= lowSchemaName %>/'+ _id) 
    .expect(204, done);
  });
});
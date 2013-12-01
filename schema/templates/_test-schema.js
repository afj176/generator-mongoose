var request = require('supertest'),
    express = require('express');

process.env.NODE_ENV = 'test';

var app = require('../app.js');
var _id = '';


describe('POST New <%= _.capitalize(schemaName) %>', function(){
  it('creates new <%= schemaName.toLowerCase() %> and responds with json success message', function(done){
    request(app)
    .post('/api/<%= schemaName.toLowerCase() %>')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({"<%= schemaName.toLowerCase() %>": <%= mockData %>})
    .expect(200)
    .end(function(err, res) {
      if (err) {
        throw err;
      }
      _id = res.body._id;
      done();
    });
  });
});

describe('GET List of <%= _.capitalize(schemaName) %>s', function(){
  it('responds with a list of <%= schemaName.toLowerCase() %> items in JSON', function(done){
    request(app)
    .get('/api/<%= schemaName.toLowerCase() %>s')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});

describe('GET <%= _.capitalize(schemaName) %> by ID', function(){
  it('responds with a single <%= schemaName.toLowerCase() %> item in JSON', function(done){
    request(app)
    .get('/api/<%= schemaName.toLowerCase() %>/'+ _id )
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});


describe('PUT <%= _.capitalize(schemaName) %> by ID', function(){
  it('updates <%= schemaName.toLowerCase() %> item in return JSON', function(done){
    request(app)
    .put('/api/<%= schemaName.toLowerCase() %>/'+ _id )
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({ "<%= schemaName.toLowerCase() %>": { "title": "Hell Is Where There Are No Robots" } })    
    .expect(200, done);
  });
});

describe('DELETE <%= _.capitalize(schemaName) %> by ID', function(){
  it('should delete <%= schemaName.toLowerCase() %> and return 200 status code', function(done){
    request(app)
    .del('/api/<%= schemaName.toLowerCase() %>/'+ _id) 
    .expect(200, done);
  });
});
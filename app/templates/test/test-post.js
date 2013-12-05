var request = require('supertest'),
    express = require('express');

process.env.NODE_ENV = 'test';

var app = require('../app.js');
var _id = '';


describe('POST New Post', function(){
  it('creates new post and responds with json success message', function(done){
    request(app)
    .post('/api/post')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({ "post": {
      "title": "Hell Is Other Robots",
      "excerpt": "Alice may have called in on the meeting at Malkin Tower...",
      "content": "Alice may have called in on the meeting at Malkin Tower on her way to a secret (and illegal) Good Friday Catholic service, and refused to speak for fear of incriminating her fellow Catholics.",
      "active": true
    } })
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

describe('GET List of Posts', function(){
  it('responds with a list of post items in JSON', function(done){
    request(app)
    .get('/api/posts')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});

describe('GET Post by ID', function(){
  it('responds with a single post item in JSON', function(done){
    request(app)
    .get('/api/post/'+ _id )
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, done);
  });
});


describe('PUT Post by ID', function(){
  it('updates post item in return JSON', function(done){
    request(app)
    .put('/api/post/'+ _id )
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .send({ "post": { "title": "Hell Is Where There Are No Robots" } })    
    .expect(200, done);
  });
});

describe('DELETE Post by ID', function(){
  it('should delete post and return 204 status code', function(done){
    request(app)
    .del('/api/post/'+ _id) 
    .expect(204, done);
  });
});
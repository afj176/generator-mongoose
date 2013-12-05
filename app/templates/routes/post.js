module.exports = function(app) {
  // Module dependencies.
  var mongoose = require('mongoose'),
      Post = mongoose.models.Post,
      api = {};

  // ALL
  api.posts = function (req, res) {
    Post.find(function(err, posts) {
      if (err) {
        res.json(500, err);
      } else {    
        res.json({posts: posts});
      }
    });
  };

  // GET
  api.post = function (req, res) {
    var id = req.params.id;
    Post.findOne({ '_id': id }, function(err, post) {
      if (err) {
        res.json(404, err);
      } else {
        res.json(200, {post: post});
      }
    });
  };

  // POST
  api.addPost = function (req, res) {
    
    var post;
      
    if(typeof req.body.post == 'undefined'){
      return res.json(500, {message: 'post is undefined'});
    }

    post = new Post(req.body.post);

    post.save(function (err) {
      if (!err) {
        console.log("created post");
        return res.json(201, post.toObject());
      } else {
         return res.json(500, err);
      }
    });

  };

  // PUT
  api.editPost = function (req, res) {
    var id = req.params.id;

    Post.findById(id, function (err, post) {


    
      if(typeof req.body.post["title"] != 'undefined'){
        post["title"] = req.body.post["title"];
      }  
    
      if(typeof req.body.post["excerpt"] != 'undefined'){
        post["excerpt"] = req.body.post["excerpt"];
      }  
    
      if(typeof req.body.post["content"] != 'undefined'){
        post["content"] = req.body.post["content"];
      }  
    
      if(typeof req.body.post["active"] != 'undefined'){
        post["active"] = req.body.post["active"];
      }  
    
      if(typeof req.body.post["created"] != 'undefined'){
        post["created"] = req.body.post["created"];
      }  
    

      return post.save(function (err) {
        if (!err) {
          console.log("updated post");
          return res.json(200, post.toObject());        
        } else {
         return res.json(500, err);
        }
        return res.json(post);
      });
    });

  };

  // DELETE
  api.deletePost = function (req, res) {
    var id = req.params.id;
    Post.findById(id, function (err, post) {
      return post.remove(function (err) {
        if (!err) {
          console.log("removed post");
          return res.send(204);
        } else {
          console.log(err);
          return res.json(500, err);
        }
      });
    });

  };


  app.get('/api/posts', api.posts);
  app.get('/api/post/:id', api.post);
  app.post('/api/post', api.addPost);
  app.put('/api/post/:id', api.editPost);
  app.delete('/api/post/:id', api.deletePost);
};
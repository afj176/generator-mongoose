module.exports = function(app) {
  // Module dependencies.
  var mongoose = require('mongoose'),
      Post = mongoose.models.Post,
      api = {};

  // ALL
  api.posts = function (req, res) {
    Post.find(function(err, posts) {
      if (err) {
        res.status(500);
        res.json(err);
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
        res.status(500);
        res.json(err);
      } else {
        res.json({post: post});
      }
    });
  };

  // POST
  api.addPost = function (req, res) {
    
    var post;
      
    if(typeof req.body.post == 'undefined'){
         res.status(500);
         return res.json({message: 'post is undefined'});
    }

    post = new Post(req.body.post);

    post.save(function (err) {
      if (!err) {
        console.log("created post");
        return res.json(post.toObject(), 200);
      } else {
         res.status(500);
         return res.json(err);
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
          return res.json({}, 200);        
        } else {
         res.status(500);
         return res.json(err);
        }
        return res.json(post);
      });
    });

  };

  // DELETE
  api.deletePost = function (req, res) {
    var id = req.params.id;
    return Post.findById(id, function (err, post) {
      return post.remove(function (err) {
        if (!err) {
          console.log("removed post");
          return res.send('');
        } else {
          console.log(err);
          res.status(500);
          return res.json(err);
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
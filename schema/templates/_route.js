module.exports = function(app) {
  // Module dependencies.
  var mongoose = require('mongoose'),
      <%= _.capitalize(schemaName) %> = mongoose.models.<%= _.capitalize(schemaName) %>,
      api = {};

  // ALL
  api.<%= schemaName.toLowerCase() %>s = function (req, res) {
    <%= _.capitalize(schemaName) %>.find(function(err, <%= schemaName.toLowerCase() %>s) {
      if (err) {
        res.json(500, err);
      } else {    
        res.json({<%= schemaName.toLowerCase() %>s: <%= schemaName.toLowerCase() %>s});
      }
    });
  };

  // GET
  api.<%= schemaName.toLowerCase() %> = function (req, res) {
    var id = req.params.id;
    <%= _.capitalize(schemaName) %>.findOne({ '_id': id }, function(err, <%= schemaName.toLowerCase() %>) {
      if (err) {
        res.json(404, err);
      } else {
        res.json({<%= schemaName.toLowerCase() %>: <%= schemaName.toLowerCase() %>});
      }
    });
  };

  // POST
  api.add<%= _.capitalize(schemaName) %> = function (req, res) {
    
    var <%= schemaName.toLowerCase() %>;
      
    if(typeof req.body.<%= schemaName.toLowerCase() %> == 'undefined'){
         res.status(500);
         return res.json({message: '<%= schemaName.toLowerCase() %> is undefined'});
    }

    <%= schemaName.toLowerCase() %> = new <%= _.capitalize(schemaName) %>(req.body.<%= schemaName.toLowerCase() %>);

    <%= schemaName.toLowerCase() %>.save(function (err) {
      if (!err) {
        console.log("created <%= schemaName.toLowerCase() %>");
        return res.json(201, <%= schemaName.toLowerCase() %>.toObject());
      } else {
        return res.json(500, err);
      }
    });

  };

  // PUT
  api.edit<%= _.capitalize(schemaName) %> = function (req, res) {
    var id = req.params.id;

    <%= _.capitalize(schemaName) %>.findById(id, function (err, <%= schemaName.toLowerCase() %>) {


    <% schemaFields.forEach(function(field, index) { %>
      if(typeof req.body.<%= schemaName.toLowerCase() %>["<%= field.split(':')[0] %>"] != 'undefined'){
        <%= schemaName.toLowerCase() %>["<%= field.split(':')[0] %>"] = req.body.<%= schemaName.toLowerCase() %>["<%= field.split(':')[0] %>"];
      }  
    <% }) %>

      return <%= schemaName.toLowerCase() %>.save(function (err) {
        if (!err) {
          console.log("updated <%= schemaName.toLowerCase() %>");
          return res.json(200, <%= schemaName.toLowerCase() %>.toObject());        
        } else {
         return res.json(500, err);
        }
        return res.json(<%= schemaName.toLowerCase() %>);
      });
    });

  };

  // DELETE
  api.delete<%= _.capitalize(schemaName) %> = function (req, res) {
    var id = req.params.id;
    return <%= _.capitalize(schemaName) %>.findById(id, function (err, <%= schemaName.toLowerCase() %>) {
      return <%= schemaName.toLowerCase() %>.remove(function (err) {
        if (!err) {
          console.log("removed <%= schemaName.toLowerCase() %>");
          return res.send(204);
        } else {
          console.log(err);
          return res.json(500, err);
        }
      });
    });

  };


  app.get('/api/<%= schemaName.toLowerCase() %>s', api.<%= schemaName.toLowerCase() %>s);
  app.get('/api/<%= schemaName.toLowerCase() %>/:id', api.<%= schemaName.toLowerCase() %>);
  app.post('/api/<%= schemaName.toLowerCase() %>', api.add<%= _.capitalize(schemaName) %>);
  app.put('/api/<%= schemaName.toLowerCase() %>/:id', api.edit<%= _.capitalize(schemaName) %>);
  app.delete('/api/<%= schemaName.toLowerCase() %>/:id', api.delete<%= _.capitalize(schemaName) %>);
};
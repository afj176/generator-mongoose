module.exports = function(app) {
  // Module dependencies.
  var mongoose = require('mongoose'),
      <%= capSchemaName %> = mongoose.models.<%= capSchemaName %>,
      api = {};

  // ALL
  api.<%= lowSchemaName %>s = function (req, res) {
    <%= capSchemaName %>.find(function(err, <%= lowSchemaName %>s) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json({<%= lowSchemaName %>s: <%= lowSchemaName %>s});
      }
    });
  };

  // GET
  api.<%= lowSchemaName %> = function (req, res) {
    var id = req.params.id;
    <%= capSchemaName %>.findOne({ '_id': id }, function(err, <%= lowSchemaName %>) {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json({<%= lowSchemaName %>: <%= lowSchemaName %>});
      }
    });
  };

  // POST
  api.add<%= capSchemaName %> = function (req, res) {

    var <%= lowSchemaName %>;

    if(typeof req.body.<%= lowSchemaName %> == 'undefined'){
      res.status(500).json({message: '<%= lowSchemaName %> is undefined'});
    }

    <%= lowSchemaName %> = new <%= capSchemaName %>(req.body.<%= lowSchemaName %>);

    <%= lowSchemaName %>.save(function (err) {
      if (!err) {
        console.log("created <%= lowSchemaName %>");
        return res.status(201).json(<%= lowSchemaName %>.toObject());
      } else {
        return res.status(500).json(err);
      }
    });

  };

  // PUT
  api.edit<%= capSchemaName %> = function (req, res) {
    var id = req.params.id;

    <%= capSchemaName %>.findById(id, function (err, <%= lowSchemaName %>) {


    <% schemaFields.forEach(function(field, index) { %>
      if(typeof req.body.<%= lowSchemaName %>["<%= field.split(':')[0] %>"] != 'undefined'){
        <%= lowSchemaName %>["<%= field.split(':')[0] %>"] = req.body.<%= lowSchemaName %>["<%= field.split(':')[0] %>"];
      }
    <% }) %>

      return <%= lowSchemaName %>.save(function (err) {
        if (!err) {
          console.log("updated <%= lowSchemaName %>");
          return res.status(200).json(<%= lowSchemaName %>.toObject());
        } else {
         return res.status(500).json(err);
        }
        return res.status(200).json(<%= lowSchemaName %>);
      });
    });

  };

  // DELETE
  api.delete<%= capSchemaName %> = function (req, res) {
    var id = req.params.id;
    return <%= capSchemaName %>.findById(id, function (err, <%= lowSchemaName %>) {
      return <%= lowSchemaName %>.remove(function (err) {
        if (!err) {
          console.log("removed <%= lowSchemaName %>");
          return res.status(204).send();
        } else {
          console.log(err);
          return res.status(500).json(err);
        }
      });
    });

  };


  app.get('/api/<%= lowSchemaName %>s', api.<%= lowSchemaName %>s);
  app.get('/api/<%= lowSchemaName %>/:id', api.<%= lowSchemaName %>);
  app.post('/api/<%= lowSchemaName %>', api.add<%= capSchemaName %>);
  app.put('/api/<%= lowSchemaName %>/:id', api.edit<%= capSchemaName %>);
  app.delete('/api/<%= lowSchemaName %>/:id', api.delete<%= capSchemaName %>);
};

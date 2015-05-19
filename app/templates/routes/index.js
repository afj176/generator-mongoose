var express = require('express');
var app = express();
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {

  var routes = [
    { path: "/posts", method: "GET" },
    { path: "/post", method: "POST" },
    { path: "/post/:id", method: "GET" },
    { path: "/post/:id", method: "PUT" },
    { path: "/post/:id", method: "DELETE" }
  ];

  res.render('index', {routes: routes });

});

module.exports = router;

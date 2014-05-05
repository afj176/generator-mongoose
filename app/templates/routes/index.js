module.exports = function(app) {
	var route = {};

	// index.html
	route.index = function (req, res) {
	  res.render('index', {locals: { routes: app._router.stack }});
	};

	app.get('/', route.index);
};
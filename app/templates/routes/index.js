module.exports = function(app) {
	var route = {};

	// index.html
	route.index = function (req, res) {
		/** Code to get the list of routes**/
		var app_routes = app._router.map;
		var routes = [];
		for (var i = 0; i < app_routes.get.length; i++) {
			routes.push({
				path : app_routes.get[i].path,
				method : 'GET'
			});
		};

		for (var i = 0; i < app_routes.post.length; i++) {
			routes.push({
				path : app_routes.post[i].path,
				method : 'POST'
			});
		};

		for (var i = 0; i < app_routes.put.length; i++) {
			routes.push({
				path : app_routes.put[i].path,
				method : 'PUT'
			});
		};

		for (var i = 0; i < app_routes.delete.length; i++) {
			routes.push({
				path : app_routes.delete[i].path,
				method : 'DELETE'
			});
		};

		/** Code to get the list of routes**/
		res.render('index', {locals: { routes: routes }});
	};

	app.get('/', route.index);
};
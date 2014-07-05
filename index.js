var connect = require("connect");
var serveStatic = require("serve-static");
var makeJade = require("./lib/processor/jade");

module.exports = function (path) {
	var app = connect();
	app.use(function (req, res, next) {
		if (req.url === '/current-time') {
			res.end((new Date()).toISOString() + '\n');
		} else {
			next();
		}
	});
	app.use(serveStatic(path));
	app.use(makeJade(path));
	return app;
}

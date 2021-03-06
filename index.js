'use strict';

var connect = require('connect');
var serveStatic = require('serve-static');
var makeJade = require('./lib/processor/jade');
var makeLess = require('./lib/processor/less');
var reject = require('./lib/processor/reject');

module.exports = function (path) {
	var app = connect();
	app.use(function (req, res, next) {
		if (req.url === '/') {
			req.url = '/index.html';
		}
		next();
	});
	app.use(function (req, res, next) {
		if (req.url === '/current-time') {
			res.end((new Date()).toISOString() + '\n');
		} else {
			next();
		}
	});
	app.use(reject());
	app.use(serveStatic(path));
	app.use(makeJade(path));
	app.use(makeLess(path));
	return app;
};

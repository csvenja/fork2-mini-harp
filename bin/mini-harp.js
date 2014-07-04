#!/usr/bin/env node

var argv = require("minimist")(process.argv.slice(2));
var createMiniHarp = require("../index"), app = createMiniHarp();
var port = argv.port || 4000;

console.log("Starting mini-harp on http://localhost:" + port);
app
	.use(function (req, res, next) {
		if (req.url === '/current-time') {
			res.end((new Date()).toISOString() + '\n');
		} else {
			next();
		}
	})
	.listen(port);

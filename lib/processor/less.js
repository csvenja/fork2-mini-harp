'use strict';

module.exports = makeLess;

var path = require('path');
var fs = require('fs');
var less = require('less');

function makeLess(root) {
	return function (req, res, next) {
		if (path.extname(req.url) === '.css') {
			var file = path.join(root, path.basename(req.url));
			fs.readFile(file, {encoding: 'utf8'}, function (err, data) {
				if (err) {
					var lessFile = path.join(root, path.basename(req.url, '.css') + '.less');
					fs.readFile(lessFile, {encoding: 'utf8'}, function (err, data) {
						if (err) {
							next();
						} else {
							less.render(data, function (err, css) {
								if (err) {
									next();
								} else {
									res.setHeader("Content-Length", css.length);
									res.end(css);
								}
							});
						}
					});
				} else {
					res.setHeader("Content-Length", data.length);
					res.end(data);
				}
			});
		} else {
			next();
		}
	};
}
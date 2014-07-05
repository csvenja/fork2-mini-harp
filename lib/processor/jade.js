'use strict';

module.exports = makeJade;

var path = require('path');
var fs = require('fs');
var jade = require('jade');

function makeJade(root) {
	return function (req, res, next) {
		if (path.extname(req.url) === '.html') {
			var file = path.join(root, path.basename(req.url));
			fs.readFile(file, {encoding: 'utf8'}, function (err, data) {
				if (err) {
					var jadeFile = path.join(root, path.basename(req.url, '.html') + '.jade');
					jade.renderFile(jadeFile, function (err, html) {
						if (err) {
							next();
						} else {
							res.setHeader("Content-Type", "text/html; charset=UTF-8");
							res.setHeader("Content-Length", html.length);
							res.end(html);
						}
					});
					// fs.readFile(jadeFile, {encoding: 'utf8'}, function (err, data) {
					// 	if (err) {
					// 		next();
					// 	} else {
					// 		jade.render(data, function (err, html) {
					// 			if (err) {
					// 				next();
					// 			} else {
					//				res.setHeader("Content-Type", "text/html; charset=UTF-8");
					//				res.setHeader("Content-Length", html.length);
					// 				res.end(html);
					// 			}
					// 		});
					// 	}
					// });
				} else {
					res.setHeader("Content-Type", "text/html; charset=UTF-8");
					res.setHeader("Content-Length", data.length);
					res.end(data);
				}
			});
		} else {
			next();
		}
	};
}

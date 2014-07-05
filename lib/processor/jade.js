module.exports = makeJade;

var path = require('path');
var fs = require('fs');
var jade = require('jade');

function makeJade(root) {
	return function (req, res, next) {
		if (path.extname(req.url) === '.html') {
			var file = path.join(root, path.basename(req.url, '.html') + '.jade');
			console.log(file);
			// fs.readFile(file, {encoding: "utf8"}, function (err, data) {
			// 	if (err) {
			// 		next();
			// 	}
			// 	jade.render(data, function (err, html) {
			// 		if (err) {
			// 			next();
			// 		}
			// 		res.end(html);
			// 	});
			// });
			jade.renderFile(file, function (err, html) {
				if (err) {
					next();
				}
				res.end(html);
			});
		} else {
			next();
		}
	}
}

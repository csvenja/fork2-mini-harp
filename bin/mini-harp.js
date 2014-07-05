#!/usr/bin/env node

var argv = require("minimist")(process.argv.slice(2));
var createMiniHarp = require("../index");
var path = argv._[0] || process.cwd();
var port = argv.port || 4000;
var app = createMiniHarp(path);

console.log("Starting mini-harp on http://localhost:" + port);
app.listen(port);

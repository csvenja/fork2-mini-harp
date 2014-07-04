// var connect = require("connect");

// var app = connect();

// console.log("Starting http server on http://localhosl:4000");
// app.listen(4000);

var createMiniHarp = require("mini-harp")
  , app = createMiniHarp();
console.log("Starting mini-harp on http://localhost:4000");
app.listen(4000);

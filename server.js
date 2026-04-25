const express = require("express");
const morgan = require("morgan");

const app = express()

app.use(morgan("dev"));
// Serve static files from the public dir
app.use(express.static("public"));

app.listen(8080, function () {
   console.log("Listening on port 8080...");
});

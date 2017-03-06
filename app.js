"use strict";

let express = require("express");
let path = require("path");
let app = express();

/*Serve static files from public directory*/
app.use(express.static(path.join(__dirname, "public")));


app.get("/", function(req, res) {
    res.send("hello, world!");
});







app.listen(8080, function() {
    console.log("App listening on 8080");
});
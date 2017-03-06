"use strict";

let express = require("express");
let path = require("path");
let app = express();

/*Serve static files from public directory*/
app.use(express.static(path.join(__dirname, "public")));

/*Set views directory*/
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'hbs');





app.get("/", function(req, res) {
    res.render("index", { "title": "Hbs template" });
});



/* Handle 404 response. All other handlers should be above this*/
app.use(function (req, res, next) {
    let error = new Error("File can't be found");
    error.status = 404;
    next(error);
});

/** Error handler **/
app.use(function (err, req, res, next) {
    
    
    let errorMessage = err.message;
    res.status(err.status || 500);
    res.render("error", { "errorMessage": errorMessage });
    
    
});





module.exports = app;
"use strict";

let http = require("http");
var express = require('express');
var router = express.Router();



router.use(function (req, res, next) {
    let promise = new Promise((resolve, reject) => {
        http.get('http://rttomlinson-public-projects.herokuapp.com/', (res) => {
            const statusCode = res.statusCode;
            const contentType = res.headers['content-type'];
            
            let error;
            
            if (statusCode !== 200) {
                error = new Error(`Request failed.\n Status code: ${statusCode}`);
            } else if (!/^application\/json/.test(contentType)) {
                error = new Error(`Invalid content type.\n Content type is: ${contentType}. Need JSON. Check request headers`);
            }
            if (error) {
                reject(error);
            }
            
            res.setEncoding('utf-8');
            let rawData = '';
            res.on('data', (chunk) => rawData += chunk);
            res.on('end', () => {
                try {
                    let parsedData = JSON.parse(rawData);
                    resolve(parsedData);
                }
                catch(e) {
                    console.log(`An error occured in parsing JSON try/catch: ${e.message}`);
                    reject(e);
                }
            });
        
        }).on('error', (e) => {
            console.log(`Error message caught by http get request: ${e.message}`);
            reject(e);
        });
    });
    promise.then(function onFulfilled(data) {
        res['myAPICalls'] = {};
        res.myAPICalls['personalProjects'] = data;
        next();
    }).catch(function (error) {
        console.log(error.message);
        next();
        return;
    });
});




router.get('/', function(req, res, next) {
    res.render('index', {"projects": res.myAPICalls.personalProjects});
});



module.exports = router;
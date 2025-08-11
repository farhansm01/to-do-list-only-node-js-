/*
* Title: To-Do List
* Description: A RESTFul API for a To-Do List
* Author: Farhan Sadiq 
* Data : 21 July 2025
*
*/

//dependencies
const server = require('./lib/server');

//module scaffolding
const app = {};

app.init = () => {

    //start the server
    server.init();
}

app.init();

module.exports = app;
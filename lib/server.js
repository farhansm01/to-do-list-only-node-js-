/*
* Title: server file
* Description: contains the server logic for the application
* Author: Farhan Sadiq 
* Data : 21 July 2025
*
*/

//dependencies
const http = require('http');
const environment = require('../helpers/environments');
const { handleReqRes } = require('../helpers/handleReqRes');

//module scaffolding
const server = {};

server.handleReqRes = handleReqRes;

server.createServer = () => {
    const createServerVariable = http.createServer(server.handleReqRes);
    createServerVariable.listen(environment.port, () => {
        console.log(`server is listening on port ${environment.port}`);
    });
};

server.init = () => {
    server.createServer();
}

module.exports = server;
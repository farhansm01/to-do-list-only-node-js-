/*
* Title: Handle Requrest Response
* Description: contains the logic for handling the request and response
* Author: Farhan Sadiq 
* Data : 21 July 2025
*
*/

//dependencies
const url = require('url');
const {StringDecoder} = require('string_decoder');
const routes = require('../route');
const {notFoundHandler} = require('../handlers/notFoundHandler');
const {parseJSON} = require('../helpers/utilities');

const handler = {};

handler.handleReqRes = (req, res) => {
    //taking infos from request and url

    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObject = req.headers;

    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headersObject,
    }

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();

        requestProperties.body = parseJSON(realData);

        chosenHandler(requestProperties, (statusCode, payLoad) => {
            statusCode = typeof(statusCode) == 'number' ? statusCode : 500;
            payLoad = typeof(payLoad) == 'object' ? payLoad : {};

            const payLoadString = JSON.stringify(payLoad);

            //returning final response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payLoadString);
        })
    });



}

module.exports = handler;


// dependencies
const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../routes');
const { notFoundHandler } = require('../handlers/routeHandlers/notFoundHandler');

// app object - module scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {
    // request handle..
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObject = req.headers;
    console.log(headersObject);

    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headersObject,
    };

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    const choosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

    choosenHandler(requestProperties, (statusCode, payLoad) => {
        statusCode = typeof statusCode === 'number' ? statusCode : 500;
        payLoad = typeof payLoad === 'object' ? payLoad : {};

        const payLoadString = JSON.stringify(payLoad);

        // Return final output
        res.writeHead(statusCode);
        res.end(payLoadString);
    });

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();
        console.log(realData);
        res.end('hello buddys');
    });

    // responde handle..
};

module.exports = handler;

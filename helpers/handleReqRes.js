// dependencies
const url = require('url');
const { StringDecoder } = require('string_decoder');

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

    const decoder = new StringDecoder('utf-8');
    let realData = '';

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
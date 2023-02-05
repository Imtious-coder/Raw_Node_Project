// dependencies
const http = require('http');

// app object - module scaffolding
const app = {};

// configuration
app.config = {
    port: 8000,
};

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`Listening to port ${app.config.port}`);
    });
};

// handle request & response
app.handleReqRes = (req, res) => {
    // responde handle..
    res.end('hello buddys');
};

// start the server
app.createServer();

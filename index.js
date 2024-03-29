// dependencies
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');
const data = require('./lib/data');

// app object - module scaffolding
const app = {};

// test
// data.update('test', 'newFile', { name: 'England', language: 'english' }, (err) => {
//     console.log(err);
// });
data.update('test', 'newFile', (err) => {
    console.log(err);
});

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
app.handleReqRes = handleReqRes;

// start the server
app.createServer();

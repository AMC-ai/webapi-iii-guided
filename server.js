const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');


const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

//middleware

//custom middleware
function logger(req, res, next) {
  console.log((`${req.method} to ${req.originalUrl}`))
  next(); //allows the res to continue to the next middleware or route handler
};

function gatekeeper(req, res, next) {
  const passwordInsert = (req.password) ? ` ${req.password}` : 'mellon';



}

//write a gatekeeper middleware that reads a password from the headers and if the password is 'mellon', let it continue
//if not, send back status code 401 and message. use it for the /area51 endpoint

server.use(express.json()); // built-in middleware
// server.use(helmet()); //global
server.use(logger);

// endpoints
server.use('/api/hubs', helmet(), hubsRouter); // the router is local middleware, bc it only applies to /api/hubs

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

server.get('/echo', (req, res) => {
  res.send(req.headers);
});

//local 
server.get('/area51', helmet(), (req, res) => {
  res.send(req.headers);
});

module.exports = server;

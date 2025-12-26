const express = require('express');
const cors = require('cors');
const routes = require('./routes/index.js');

require('./db.js');

const server = express();

server.name = 'API';

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;

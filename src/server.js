'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
//need to distinguish which router we are going to use or v1 and v2 will hit the same routes
// Esoteric Resources
const notFoundHandler = require('./auth/error-handlers/404.js');//added from other server//may need to change file path
const errorHandler = require('./auth/error-handlers/500.js');//may need to change file path
const routes = require('./auth/routes/routes.js');//may need to change file path
const logger = require('./auth/middleware/logger.js');
const v1 = require('./auth/routes/v1.js');
const v2 = require('./auth/routes/v2.js')

// Prepare the express app
const app = express();

// App Level MW
app.use(logger);
app.use('/api/v2', v2);
app.use('/api/v1', v1);
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(routes);

// Catchalls
app.use('*', notFoundHandler);//added from other server
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
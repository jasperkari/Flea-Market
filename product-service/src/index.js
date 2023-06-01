const express = require('express');
const routes = require('./routes');

const app = express();

// Use routes
app.use('/', routes);

// Start server
app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server listening on port 3000');
});

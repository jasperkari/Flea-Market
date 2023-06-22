const multer = require('multer');

const ApiService = require('moleculer-web');
const { authenticate } = require('../middlewares/authenticate');

module.exports = {
  name: 'api',
  mixins: [ApiService],
  settings: {
    port: 3002,
    routes: [
      {
        name: 'get-products',
        path: '/products',
        cors: {
          origin: '*',
          methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
          allowedHeaders: ['Content-Type'],
          exposedHeaders: [],
          credentials: false,
          maxAge: 3600
        },
        aliases: {
          'GET /': 'prodDb.getProducts'
        }
      },
      {
        name: 'post-products',
        path: '/products/create',
        cors: {
          origin: '*',
          methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
          allowedHeaders: ['Content-Type', 'Authorization'],
          exposedHeaders: [],
          credentials: false,
          maxAge: 3600
        },
        use: [authenticate, multer().any()],
        aliases: {
          'POST /': 'prodDb.createProduct'
        }
      }
    ]
  }
};

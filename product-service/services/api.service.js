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
        use: [authenticate, multer().single('image')],
        aliases: {
          'POST /': async function create(req, res) {
            const result = await this.broker.call('prodDb.createProduct', {
              ...req.body,
              req
            });
            res.end(JSON.stringify(result));
          }
        },
        bodyParsers: {
          json: false,
          urlencoded: false
        }
      },
      {
        name: 'get-user-products',
        path: '/userproducts',
        cors: {
          origin: '*',
          methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
          allowedHeaders: ['Content-Type', 'Authorization'],
          exposedHeaders: [],
          credentials: false,
          maxAge: 3600
        },
        use: [authenticate],
        aliases: {
          'GET /': 'prodDb.getUserProducts',
          'DELETE /': 'prodDb.deleteOwnProduct'
        }
      }
    ]
  }
};

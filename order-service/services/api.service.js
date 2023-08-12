const multer = require('multer');

const ApiService = require('moleculer-web');
const { authenticate } = require('../middlewares/authenticate');

module.exports = {
  name: 'api',
  mixins: [ApiService],
  settings: {
    port: 3003,
    routes: [
      {
        name: 'get-Orders',
        path: '/orders',
        cors: {
          origin: '*',
          methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
          allowedHeaders: ['Content-Type'],
          exposedHeaders: [],
          credentials: false,
          maxAge: 3600
        },
        aliases: {
          'GET /': 'orderDb.getOrders'
        }
      },
      {
        name: 'post-Orders',
        path: '/Orders/create',
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
            const result = await this.broker.call('orderDb.createOrder', 
            { ...req.body },
            { meta: req.$ctx.meta },
            );
            res.end(JSON.stringify(result));
          }
        },
        bodyParsers: {
          json: true,
          urlencoded: false
        }
      }
    ]
  }
};

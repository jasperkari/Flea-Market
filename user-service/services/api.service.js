const ApiService = require('moleculer-web');
const { authenticate } = require('../middlewares/authenticate');

module.exports = {
  name: 'api',
  mixins: [ApiService],
  settings: {
    port: 3001,
    routes: [
      {
        path: '/login',
        cors: {
          origin: '*',
          methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
          allowedHeaders: ['Content-Type'],
          exposedHeaders: [],
          credentials: false,
          maxAge: 3600
        },
        aliases: {
          'POST /': 'auth.login'
        }
      },
      {
        path: '/register',
        cors: {
          origin: '*',
          methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
          allowedHeaders: ['Content-Type'],
          exposedHeaders: [],
          credentials: false,
          maxAge: 3600
        },
        aliases: {
          'POST /': 'reg.register'
        }
      },
      {
        path: '/users',
        cors: {
          origin: '*',
          methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'],
          allowedHeaders: ['Content-Type'],
          exposedHeaders: [],
          credentials: false,
          maxAge: 3600
        },
        use: [authenticate],
        aliases: {
          'GET /': 'db.getUsers',
          'DELETE /': 'db.deleteUser'
        }
      }
    ]
  }
};

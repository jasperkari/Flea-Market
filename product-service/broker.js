const { ServiceBroker } = require('moleculer');

const broker = new ServiceBroker({
  nodeID: 'product',
  transporter: 'nats://localhost:4222',
  logLevel: 'debug',
  requestTimeout: 20 * 1000
});

broker.loadServices();

broker.start();

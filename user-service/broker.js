const { ServiceBroker } = require('moleculer');

const broker = new ServiceBroker({
  nodeID: 'user',
  transporter: 'nats://localhost:4222',
  logLevel: 'debug',
  requestTimeout: 5 * 1000
});

broker.loadServices();

broker.start();

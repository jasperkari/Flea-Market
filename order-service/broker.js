const { ServiceBroker } = require('moleculer');

const broker = new ServiceBroker({
  nodeID: 'order',
  transporter: 'nats://localhost:4222',
  logLevel: 'debug',
  requestTimeout: 20 * 1000
});

broker.loadServices();

broker.start();

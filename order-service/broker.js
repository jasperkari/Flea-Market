const { ServiceBroker } = require('moleculer');

const broker = new ServiceBroker({
  nodeID: 'order',
  transporter: 'nats://172.17.0.3:4222',
  logLevel: 'debug',
  requestTimeout: 20 * 1000
});

broker.loadServices();

broker.start();

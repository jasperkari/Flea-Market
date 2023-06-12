const { ServiceBroker } = require('moleculer');

const broker = new ServiceBroker();

broker.loadServices();

broker.start();

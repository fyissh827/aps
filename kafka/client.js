const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-node-client',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'], // use container hostname
});
console.log(kafka);
module.exports = kafka;

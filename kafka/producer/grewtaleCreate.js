const kafka = require('../client.js');
const producer = kafka.producer();
const EventEmitter = require('events');
const grewtaleCreateEmitter = new EventEmitter();

grewtaleCreateEmitter.on('greet', async (data) => {
  try {
    delete data.gender;
    await producer.connect();
    const result = await producer.send({
      topic: 'ES-createGrewtale',

      messages: [
        {
          key: String(data.id ?? 87678678), // optional
          value: JSON.stringify(data), // ✅ convert object → string
        },
      ],
    });
    console.log(result, producer);
  } catch (e) {
    console.log('Error : ', e);
  }
});
module.exports = grewtaleCreateEmitter;

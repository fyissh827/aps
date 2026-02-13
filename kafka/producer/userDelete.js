const kafka = require('../client.js');
const producer = kafka.producer();
const syncEmitter = require("../eventEmitter.js");
console.log(syncEmitter);

syncEmitter.on('userDelete', async (data) => {
  console.log(data);
  try {
    await producer.connect();
    const result = await producer.send({
      topic: 'ES-deleteUser',

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


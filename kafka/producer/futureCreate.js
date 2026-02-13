const kafka = require('../client.js');
const producer = kafka.producer();
const syncEmitter = require("../eventEmitter.js");
syncEmitter.on('futureCreate', async (data) => {
    try {
    delete data.gender;
    await producer.connect();
    const result = await producer.send({
      topic: 'ES-createFuture',

      messages: [
        {
          key: String(data.id ?? 87678678), // optional
          value: JSON.stringify(data), // ✅ convert object → string
        },
      ],
    });
  //  console.log(result, producer);
  } catch (e) {
    console.log('Error : ', e);
  }
});


// ES-updateUser
// ES-updateUserProfilepic
// ES-updateUserUsername
// ES-updateUserAddress
// ES-createUser
// ES-createGrewtale
// ES-createPast
// ES-createPresent
// ES-createFuture
// ES-createWord
// ES-deleteUser
// ES-deleteGrewtale
// ES-deletePast
// ES-deletePresent
// ES-deleteFuture
// ES-deleteWord

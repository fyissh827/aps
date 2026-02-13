const EventEmitter = require('events');
const axios = require('axios');

const emitter = new EventEmitter();

// register listener
emitter.on('mailing', async (data) => {
   let url =  (process.env.MAILER_URL || 'http://locashost:3014/') + "job"
   console.log(url);
  try {
    const response = await axios.post(
      url,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Mail API response:', response.data);
  } catch (error) {
    console.error(
      'Mail API error:',
      error.response?.data || error.message
    );
  }
});

module.exports = {
  mailingEmitter: emitter,
};

const EventEmitter = require('events');
const axios = require('axios');
const CircuitBreaker = require('opossum');

const emitter = new EventEmitter();

const url = (process.env.MAILER_URL || 'http://localhost:3014/') + 'job';

// function that calls mail API
async function sendMail(data) {
  const response = await axios.post(
    url,
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
}

// circuit breaker options
const options = {
  timeout: 5000, // fail if API takes more than 5s
  errorThresholdPercentage: 50, // open circuit if 50% requests fail
  resetTimeout: 30000, // try again after 30s
};

// create breaker
const breaker = new CircuitBreaker(sendMail, options);

// fallback when circuit is open
breaker.fallback((data) => {
  console.error('Mail service unavailable. Circuit open.');
  return { status: 'failed', message: 'Mail service unavailable' };
});

// events
breaker.on('open', () => console.log('Circuit breaker OPEN'));
breaker.on('halfOpen', () => console.log('Circuit breaker HALF-OPEN'));
breaker.on('close', () => console.log('Circuit breaker CLOSED'));

// register listener
emitter.on('mailing', async (data) => {
  console.log(url);

  try {
    const result = await breaker.fire(data);
    console.log('Mail API response:', result);
  } catch (error) {
    console.error('Mail API error:', error.message);
  }
});

module.exports = {
  mailingEmitter: emitter,
};
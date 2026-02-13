const EventEmitter = require('events');

class SingletonEmitter extends EventEmitter {}
const emitter = new SingletonEmitter();

module.exports = emitter;
const Model = require('./model/index');
const { messageReplySet } = require('../../../managers/process');
module.exports = {
  async getsinglemsg(req, res, next) {
    const ob = [];
    const payload = {
      id: req.body.id,
    };
    const r = await process(payload);
    res.json(r);
  },
  async process(d) {
    return process(d);
  },
};
async function process(payload) {
  const _model = await Model._getsingle(payload);
  const access = _model.output;
  var response = [];
  if (access === 'Nothing') {
    response = 'Nothing';
  } else if (access === 'Error') {
    response = 'Error';
  } else {
    response = messageReplySet(access);
  }
  return response;
}

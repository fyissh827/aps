const Model = require('./model/index');
const { nextFormation, messageReplySet } = require('../../../managers/process');
module.exports = {
  async chat_get(req, res, next) {
    const ob = [];
    const payload = {
      length: req.body.length,
      user1: req.userData.userId,
      user2: req.body.user2,
      next: req.body.next,
    };
    const r = await process(payload);
    res.json(r);
  },
  async process(d) {
    return process(d);
  },
};
async function process(payload) {
  const _model = await Model._get(payload);
  const access = _model.output;
  var response = [];
  if (access === 'Nothing' || access === 'Error') {
    response = { data: 'nothing', user_id: payload.user2 };
  } else {
    response = {
      data: messageReplySet(access),
      next: nextFormation(access, payload),
      user_id: payload.user2,
    };
  }
  return response;
}

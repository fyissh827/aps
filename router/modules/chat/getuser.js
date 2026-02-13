const Model = require('./model/index');
const { nextFormation, messageReplySet } = require('../../../managers/process');
module.exports = {
  async chat_user_get(req, res, next) {
    const ob = [];
    const payload = {
      length: req.body.length,
      user: req.userData.userId,
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
  const _model = await Model._getuser(payload);
  const access = _model.output;

  if (access === 'Nothing' || access === 'Error') {
    var ac = 'nothing';
  } else {
    ac = {
      data: messageReplySet(access),
      next: nextFormation(access, payload, 'message_id'),
    };
  }
  return ac;
}

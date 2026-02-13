const Model = require('./model/index');
const { nextFormation } = require('../../../managers/process');
const { timeSettingOne } = require('../../modules/time/search');
//const time2 = require('./modules/time/search2');
module.exports = {
  async past(req, res, next) {
    const payload = {
      _h: req.body.query,
      length: req.body.length,
      _m: req.userData.userId,
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
  const _model = await Model.past(payload);

  const data = _model.output;

  if (data === 'nothing' || data === 'Error' || data === 'Bug') {
    var ac = { data: 'nothing' };
  } else {
    ac = { data: timeSettingOne(data), next: nextFormation(data, payload) };
  }

  return ac;
}

const Model = require('./model/index');
const tester = require('../../modules/tester');
const { nextFormation } = require('../../../managers/process');
module.exports = {
  async grewtale(req, res, next) {
    const payload = {
      length: req.body.length,
      items: req.body.items,
      _h: req.body.username,
      user_id: req.userData.userId,
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
  const _model = await Model.grewtales(payload);

  const access = _model.output;
  if (access === 'Nothing') {
    var ac = 'nothing';
  } else {
    ac = tester.system('_', access);
  }
  var load = {
    data: ac,
    next: nextFormation(ac, payload),
  };

  return load;
}

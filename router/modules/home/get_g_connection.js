const Model = require('./model/index_alpha');
const tester = require('../../modules/tester');
const { nextFormation } = require('../../../managers/process');
module.exports = {
  async grewtale(req, res, next) {
    const ob = [];
    const payload = {
      length: req.body.length,
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
async function process(d) {
  const _model = await Model.home_g_connection(d);
  const access = _model.output;
  if (access === 'Nothing') {
    var ac = 'nothing';
  } else {
    ac = tester.system('_', access);
  }
  var load = {
    data: ac,
    next: nextFormation(ac, d),
  };
  return load;
}

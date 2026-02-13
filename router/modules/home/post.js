const Model = require('./model/index_alpha');
const tester = require('../../modules/tester');
module.exports = {
  async grewtale(req, res, next) {
    const ob = [];
    const payload = {
      id: req.body.id,
      user_id: req.userData.userId,
    };
    const r = await process(payload);
    res.json(r);
  },
  async process(d) {
    return process(d);
  },
};
async function process(d) {
  const _model = await Model.post(d);
  const access = _model.output;
  var ac = null;
  if (access === 'Nothing' || access === 'Error') {
    ac = 'nothing';
  } else {
    ac = tester.system('_', access);
  }
  var load = ac;
  return load;
}

const Model = require('./model/index_beta');
const { nextFormation } = require('../../../managers/process');
module.exports = {
  async connector_user_get(req, res, next) {
    const payload = {
      id: req.body.id,
      length: req.body.length,
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
  const _model = await Model.connector_get(payload);
  var access = _model.output;
  var final = [];
  if (access === 'Nothing' || access === 'Error') {
    final = 'nothing';
  } else {
    final = { data: access, next: nextFormation(access, payload) };
  }
  return final;
}

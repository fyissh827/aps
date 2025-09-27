const Model = require('./model/index');
const { timing } = require('../../../managers/timing.js');
const { nextFormation } = require('../../../managers/process');
module.exports = {
  async alerts_get(req, res, next) {
    const payload = {
      id: req.userData.userId,
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
  const _model = await Model.get(payload);
  var access = _model.output;
  var c_data1 = [];
  if (access === 'Nothing' || access === 'Error') {
    var ac = 'nothing';
  } else {
    c_data1 = access;
    for (var i = 0; i < c_data1.length; i++) {
      c_data1[i].created_at = timing(c_data1[i].created_at);
    }
    ac = {
      data: c_data1,
      next: nextFormation(c_data1, payload),
    };
  }
  return ac;
}

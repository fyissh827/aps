const Model = require('./model/index');

const { timing } = require('../../../managers/timing.js');
const { nextFormation } = require('../../../managers/process');
module.exports = {
  async comment_get(req, res, next) {
    const ob = [];
    const payload = {
      length: req.body.length,
      primitive_id: req.body.primitive_id,
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
  const access = _model.output;
  var response = [];
  if (access === 'Nothing' || access === 'Error') {
    var ac = 'nothing';
  } else {
    for (let i = 0; i < access.length; i++) {
      var message = access[i].message;
      var iso = access[i].iso;
      var point = access[i].point;
      var type = access[i].type;
      var id = access[i].id;
      var file = access[i].file;
      var u_status = access[i].u_status;
      var user_id = JSON.parse(access[i].person);
      var grewtale = access[i].grewtale;
      var first_name = access[i].first_name;
      var primitive_id = access[i].primitive_id;
      var last_name = access[i].last_name;
      var profilepic = access[i].profilepic;

      const time = timing(access[i].created_at);
      response.push({
        file: file,
        iso: iso,
        point: point,
        grewtale: grewtale,
        type: type,
        id: id,
        primitive_id: primitive_id,
        person: user_id,
        message: message,
        u_status: u_status,
        first_name: first_name,
        last_name: last_name,
        profilepic: profilepic,
        created_at: time,
      });
    }
    ac = { data: response, next: nextFormation(response, payload) };
  }
  return ac;
}

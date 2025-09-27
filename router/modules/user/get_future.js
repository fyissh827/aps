const Model = require('./model/index_alpha');
const date = require('date-and-time');
const { nextFormation } = require('../../../managers/process');
module.exports = {
  async get_future(req, res) {
    var payload = {
      _m: req.body.username,
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
async function process(payload) {
  var data = [];
  const _model = await Model.future(payload);
  const access = _model.output;
  if (access === 'Nothing' || access === 'Error') {
    var ac = 'nothing';
  } else {
    var final = [];
    const obj = access;
    for (var i = 0; i < obj.length; i++) {
      var index = null;
      const now = obj[i].created_at;
      var filter_date = date.format(now, 'ddd, MMM DD YYYY');

      final.push({
        active: {
          value: obj[i].active,
          id: obj[i].active_id,
        },
        id: obj[i].id,
        name: obj[i].name,
        type: obj[i].type,
        file: obj[i].file,
        file_type: obj[i].file_type,
        date1st: obj[i].date_1st,
        date2nd: obj[i].date_2nd,
        dateType: obj[i].date_type,
        location: obj[i].location,
        try: obj[i].try,
        button: [{ b: obj[i].b1 }, { b: obj[i].b2 }, { b: obj[i].b3 }],

        created_at: filter_date,
        username: obj[i].username,
        user_id: obj[i].user_id,
      });
    }
    ac = {
      data: final,
      next: nextFormation(final, payload),
    };
  }
  return ac;
}

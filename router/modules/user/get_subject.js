const Model = require('./model/index');
module.exports = {
  async get_subject(req, res) {
    const payload = {
      _m: req.body.username,
    };
    const r = await process(payload);
    res.json(r);
  },
  async process(d) {
    return process(d);
  },
};
async function process(payload) {
  const _model = await Model.subject(payload);

  var load = _model.output;
  return load;
}

const Model = require('./model/index');
module.exports = {
  async chat_seen(req, res, next) {
    const ob = [];
    const payload = {
      id: req.body.id,
    };
    const _model = await Model._seen(payload);
    const access = _model.output;
    res.json(access);
  },
};

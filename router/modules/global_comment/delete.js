const Model = require('./model/index');
module.exports = {
  async comment_delete(req, res, next) {
    const ob = [];
    const payload = {
      id: req.body.id,
    };
    const _model = await Model._delete(payload);
    const access = _model.output;
    res.json(access);
  },
};

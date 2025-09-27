const Model = require('./model/index_alpha');
module.exports = {
  async future_delete(req, res) {
    const payload = {
      id: req.body.id,
    };
    const _model = await Model.future_delete(payload);
    res.json(_model.output);
  },
};

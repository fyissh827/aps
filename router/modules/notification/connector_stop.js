const Model = require('./model/index');

module.exports = {
  async connector_stop(req, res) {
    const payload = {
      id: req.body.id,
    };
    const _model = await Model.stop(payload);
    res.json(_model.output);
  },
};

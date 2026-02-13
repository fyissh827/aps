const Model = require('./model/index');
module.exports = {
  async country(req, res) {
    const payload = {
      id: req.body.state,
    };

    const _model = await Model.country(payload);

    res.json(_model.output);
  },
};

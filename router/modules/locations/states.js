const Model = require('./model/index');
module.exports = {
  async states(req, res) {
    const payload = {
      id: req.body.country,
    };

    const _model = await Model.state(payload);

    res.json(_model.output);
  },
};

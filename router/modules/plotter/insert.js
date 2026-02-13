const Model = require('./model/index');

module.exports = {
  async plotter_insert(req, res) {
    const payload = {
      user_id: req.userData.userId,
      grew_id: req.body.id,
      plot: req.body.count,
      active: req.body.active,
    };
    const _model = await Model.insert(payload);

    res.json(_model.output);
  },
};

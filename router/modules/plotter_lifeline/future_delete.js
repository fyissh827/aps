const Model = require('./model/index');

module.exports = {
  async future_plotter_delete(req, res) {
    const payload = {
      user_id: req.userData.userId,
      id: req.body.id,
    };
    const _model = await Model.deleted_future(payload);

    res.json(_model.output);
  },
};

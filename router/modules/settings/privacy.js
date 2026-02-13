const Model = require('./model/index');

module.exports = {
  async privacy(req, res) {
    var payload = {
      _h: req.body.data,
      _m: req.userData.userId,
    };
    const _model = await Model.privacy(payload);

    res.json(_model.output);
  },
};

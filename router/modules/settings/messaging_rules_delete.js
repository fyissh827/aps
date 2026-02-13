const Model = require('./model/index');

module.exports = {
  async messaging_rules_delete(req, res) {
    var payload = {
      _m: req.userData.userId,
    };
    const _model = await Model.messaging_rules_delete(payload);

    res.json(_model.output);
  },
};

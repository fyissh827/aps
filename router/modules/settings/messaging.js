const Model = require('./model/index');

module.exports = {
  async messaging(req, res) {
    var payload = {
      _h: req.body.data,
      _m: req.userData.userId,
    };
    const _model = await Model.messaging(payload);
    res.set({
      Response: '567',
    });
    res.json(_model.output);
  },
};

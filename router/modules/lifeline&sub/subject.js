const Model = require('./model/index');
module.exports = {
  async subject(req, res) {
    const payload = {
      _m: req.userData.userId,
      _h: req.body.name,
      _g: req.body.type,
      _p: req.body.meaning,
    };
    const _model = await Model.subject(payload);
    res.json(_model.output);
  },
};

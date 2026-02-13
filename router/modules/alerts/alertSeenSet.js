const Model = require('./model/index');
module.exports = {
  async alert_seen_set(req, res, next) {
    const payload = {
      id: req.userData.userId,
      seen: req.body.seen,
    };

    const _model = await Model._alertCountSet(payload);

    if (_model._output === 'Error' || _model.output === 'Nothing') {
      var output = 'Error';
    } else {
      output = 'Ok';
    }
    res.json(output);
  },
};

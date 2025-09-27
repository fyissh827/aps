const Model = require('./model/index');
const { updateUserSingle } = require('../../../redis/index.js');
module.exports = {
  async _deactivate(req, res) {
    var final = '';
    const payload = {
      _m: req.userData.userId,
    };
    const _model = await Model.deactivate_user(payload);
    if (_model.output === 'Deleted') {
      const value = await updateUserSingle(payload._m, 'status', 1);
      if (value === 'OK') final = 'Deleted';
      else final = 'Error';
    } else {
      final = _model.output;
    }
    res.json(final);
  },
};

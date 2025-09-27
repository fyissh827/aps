const Model = require('./model/index');
const multer = require('multer');
const { updateUserSingle } = require('../../../redis/index.js');
module.exports = {
  async profilepic(req, res) {
    const payload = {
      user_id: req.body.userId,
      profilepic: req.body.profilepic,
    };

    const _model = await Model.update(payload);
    if (_model.output === 'Updated') {
      const value = await updateUserSingle(
        payload.user_id,
        'profilepic',
        payload.profilepic
      );
      if (value === 'OK')
        var result = { msg: _model.output, file: payload.profilepic };
    } else if (_model.output !== 'Updated' || value !== 'OK') {
      result = { msg: 'Error' };
    }

    res.json(result);
  },
};

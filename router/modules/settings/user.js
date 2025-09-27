const Model = require('./model/index_alpha');
const Joi = require('joi');
const { updateUserSingle } = require('../../../redis/index.js');
module.exports = {
  async username(req, res) {
    const scema = Joi.object({
      data: Joi.string().min(5).max(12).required(),
    });
    let result = scema.validate(req.body);
    if (result.error) {
      var message = result.error.details[0].message;
      res.json(message);
      return;
    }
    var final = '';
    const payload = {
      username: req.body.data,
      id: req.userData.userId,
    };
    const _model = await Model.username(payload);

    if (_model.output === 'Updated') {
      const value = await updateUserSingle(
        payload.id,
        'username',
        payload.username
      );
      if (value === 'OK') final = 'Updated';
      else final = 'Error';
    } else {
      final = _model.output;
    }
    res.json(final);
  },
};

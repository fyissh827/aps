const Model = require('./model/index_alpha');
const Joi = require('joi');
const { updateUserSingle } = require('../../../redis/index.js');
module.exports = {
  async email(req, res) {
    const scema = Joi.object({
      data: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      }),
    });
    let result = scema.validate(req.body);
    if (result.error) {
      var message = result.error.details[0].message;
      res.json(message);
      return;
    }
    var final = '';
    const payload = {
      email: req.body.data,
      id: req.userData.userId,
    };
    const _model = await Model.email(payload);
    if (_model.output === 'Updated') {
      const value = await updateUserSingle(payload.id, 'email', payload.email);
      if (value === 'OK') final = 'Updated';
      else final = 'Error';
    } else {
      final = _model.output;
    }
    res.json(final);
  },
};

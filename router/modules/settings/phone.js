const Model = require('./model/index_alpha');
const Joi = require('joi');
//const { updateUserSingle } = require('../../../redis/index.js');
module.exports = {
  async phone(req, res) {
    const scema = Joi.object({
      data: Joi.number().required(),
    });
    let result = scema.validate(req.body);
    if (result.error) {
      var message = result.error.details[0].message;
      res.json(message);
      return;
    }
    var final = '';
    const payload = {
      phone: req.body.data,
      id: req.userData.userId,
    };
    const _model = await Model.phone(payload);
    if (_model.output === 'Updated') {
      final = 'Updated';
    } else {
      final = _model.output;
    }
    res.json(final);
  },
};

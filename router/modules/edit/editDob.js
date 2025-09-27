const con = require('../../../database/index.js'),
  Joi = require('joi'),
  Model = require('./model/index');

const { SetUserData } = require('../../../redis/index.js');
module.exports = {
  async edit_dob(req, res) {
    let o = Joi.object({
      year: Joi.number().integer().min(1950).max(2009).required(),
      month: Joi.number().required(),
      date: Joi.number().required(),
      full_user: Joi.required(),
    }).validate(req.body);
    if (o.error) {
      var i = o.error.details[0].message;
      return void res.json(i);
    }

    const payload = {
      id: req.userData.userId,
      year: req.body.year,
      month: req.body.month,
      date: req.body.date,
    };

    const _model = await Model.dob_update(payload);

    if (_model.output === 'Updated') {
      var userData = req.body.full_user;
      (userData.year = payload.year),
        (userData.month = payload.month),
        (userData.date = payload.date);
    } else if (_model.output !== 'Updated') output = 'Error';

    res.json(output);
  },
};

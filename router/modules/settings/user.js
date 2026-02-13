const Model = require('./model/index_alpha');
const Joi = require('joi');
const { updateUserSingle } = require('../../../redis/index.js');
module.exports = {
  async username(req, res) {
     const payload = {
      username: req.body.data,
     
     
    };
    const scema = Joi.object({
      username: Joi.string().min(5).max(12).required()
    });
    let result = scema.validate(payload);
    if (result.error) {
      var message = result.error.details[0].message;
      res.json(message);
      return;
    }
    payload.id = req.userData.userId;
    const final = await Model.username(payload);
    res.json(final);
    }
};

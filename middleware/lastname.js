const Joi = require('joi');
module.exports = {
  val: (req, res) => {
    const scema = Joi.object({
      last_name: Joi.string().min(4).required(),
    });

    let result = scema.validate(req.body);
    if (result.error) {
      res.json({
        status: 200,
        msg: 'Lastname required with min 4 character.',
      });
      return;
    }
  },
};

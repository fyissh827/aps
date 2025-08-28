const Model = require('./model/index');
const bcrypt = require('bcrypt');

const Joi = require('joi');



module.exports = {

//username set

async password_update (req, res){
	 const scema = Joi.object({ 
password: Joi.string().min(8).max(20).pattern(new RegExp('[A-Z0-9@$%&]'))

});
let result = scema.validate(req.body);
if(result.error){var message = result.error.details[0].message;
res.json(message);
return;
}
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hash = bcrypt.hashSync(req.body.password, salt);
const payload = {
	hash : hash,
	id : req.userData.userId
};
const _model = await Model.password_update(payload);
res.json(_model.output);


}
}
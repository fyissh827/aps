const Model = require('./model/index');

module.exports = {

async sound  (req, res) {
	var payload = {
		_h : req.body.data,
		_m : req.userData.userId
	}; 

   const _model = await  Model.sound(payload);
   
   res.json(_model.output);

 }
}
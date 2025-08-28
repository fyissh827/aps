const Model = require('./model/index_alpha');

module.exports = {

async messaging_rules(req, res){
	var payload = {
		_h : req.body.rules,
		_m : req.userData.userId
	}; 
	const _model = await  Model.messaging_rules(payload);
   
   res.json(_model.output);

 }
	
	}

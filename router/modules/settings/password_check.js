const Model = require('./model/index');
const bcrypt = require('bcrypt');


module.exports = {

async password_check(req, res){
	const payload = {
		 password : req.body.password,
		 id : req.userData.userId
	};
	
	 const _model = await  Model.password_check(payload);
  const access = _model.output;
  const hash = access.password;
  var _final_again = '';
   const result = bcrypt.compareSync(payload.password, hash);	
	if(result === true){
		_final_again =  true	
	}else{
		_final_again =  false
	}
	res.json(_final_again);
	}	
	
}
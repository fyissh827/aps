const con = require('../../../database/index.js'); 
const Model = require('./model/index');
module.exports = {

async me(req, res){
	const payload = {
  id : req.userData.userId
  };
	
const _model = await  Model.me_address(payload);
   
   res.json(_model.output);
 
  
}



}
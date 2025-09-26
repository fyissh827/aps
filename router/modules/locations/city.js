
const Model = require('./model/index');
module.exports = {

async city(req, res){
	const payload = {
  id : req.query.state
  };
	
const _model = await  Model.city(payload);
   
   res.json(_model.output);
 
  
}



}
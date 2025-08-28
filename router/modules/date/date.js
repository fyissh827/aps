const Model = require('./model/index');
module.exports = {

async date(req, res){
	const payload = {};
	
const _model = await  Model.date(payload);
   
   res.json(_model.output);
 
  
}



}
const Model = require('./model/index');
module.exports = {

async year(req, res){
	const payload = {};
	
const _model = await  Model.year(payload);
   
   res.json(_model.output);
 
  
}



}
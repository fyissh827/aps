 //const con = require('../../../database/index.js'); 
const Model = require('./model/index');
module.exports = {

async report_grewtale(req, res){
	

	
	
const payload = {
 id : req.body.id,
  
 };
 
 




const _model = await  Model.report_grewtale(payload);
   
   res.json(_model.output);

 },
 
 



}

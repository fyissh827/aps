const Model = require('./model/index');
module.exports = {

async search_history (req, res){	
 const payload ={
	 id :req.userData.userId ,
	 query : req.body.query 
	 
 };
 const _model = await  Model.insert(payload);
   
   res.json(_model.output);
}
}
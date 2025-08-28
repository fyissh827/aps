const Model = require('./model/index');

module.exports = {

async get(req, res)  {
 const payload = {
	 _h : req.userData.userId
 }; 
 const _model = await  Model.get(payload);
   
   res.json(_model.output);

 }
 
 }




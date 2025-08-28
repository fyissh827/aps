const Model = require('./model/index');


module.exports = {

async comment(req, res){
     		  
const payload = {
	obj : req.body.obj,
	file_type : req.body.file_type,
	user_id : req.body.userId,
	grewtale : req.body.grewtale,
	primitive_id :  req.body.primitive_id,
	accelerator :req.body.accelerator,
	message : req.body.message,
	type : req.body.type,
	standard : req.body.standard,
	iso : req.body.iso,
	point : req.body.point
}; 
  console.log(payload);
const _model = await  Model._insert(payload);
res.json(_model.output);
 
  }




};
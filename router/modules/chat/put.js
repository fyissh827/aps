const Model = require('./model/index');


module.exports = {

async chat_put(req, res){
      		  
const payload = {
	obj : req.body.obj,
	file_type : req.body.file_type,
	user1 : req.body.user1,
	message : req.body.message,
	user2 : req.body.user2,
	url :req.body.url,
	accelerator:req.body.accelerator,
	selected_id : req.body.selected_id,
	iso : req.body.iso,
	messageType: req.body.messageType,
    objType: req.body.objType,
    objId: req.body.objId

	 
}; 
  
const _model = await  Model._insert(payload);
res.json(_model.output);
 
  }




};
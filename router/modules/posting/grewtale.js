const Model = require('./model/index');
const alert = require('../alerts/model/index');
module.exports = {

async grewtale(req, res){


const payload = {
	user_id : req.body.userId,
	primitive_id :  req.body.primitive_id,
	title : req.body.title,
	content : req.body.content,
	standard : req.body.standard,
	privacy : req.body.privacy
	
};

const _model = await  Model._insert(payload);
  
  if(_model.output === 'Error' || _model.output === 'Nothing' || _model.output === 'Bug'  ){
	var output1 = {
		'msg' : 'Error',
		'id' :  0,
	}   
	res.json(output1);
  }
  else{
   
 
const payload_2 = {
	id  : _model.output.dataValues.id,
	obj : req.body.obj,
	file_type : req.body.file_type,
	webMeta : req.body.webMeta
}; 

const _model2 = await  Model._insert_file(payload_2);
 var output = {
	 'msg' : _model2.output,
	 'id' :  _model.output.insertId,
}
if(_model2.output !== 'Error' || _model2.output !== 'Nothing'){
 var payload_3 = {
  user_id :  req.body.userId,
  message :  req.body.title,
  data_id :   _model.output.dataValues.id,
  external : '',
  type : 2
 };
const _model3 = await  alert._insert(payload_3);

if(_model3.output === 'OK'){
	res.json(output)
}

 
  }



}
}
}
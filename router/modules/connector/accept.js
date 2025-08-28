
const Model = require('./model/index')

module.exports = {
async connectors_accept(req, res){
	const payload  = {
		user_id1 : req.userData.userId,
		id : req.body.id
	}
const _model = await  Model.accept(payload);
  res.json(_model.output);
  
 
 }
}
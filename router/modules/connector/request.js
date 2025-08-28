 
const Model = require('./model/index')

module.exports = {
async connectors_request(req, res){
	const payload  = {
		user_id1 : req.userData.userId,
		user_id2 : req.body.id,
		relation_value : req.body.relation_value
	}
const _model = await  Model.requested(payload);
 res.json(_model.output);
  
 
 }
}
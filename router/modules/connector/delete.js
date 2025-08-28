const Model = require('./model/index')

module.exports = {
async connectors_delete(req, res){
	const payload  = {
		id1 : req.body.id2,
		id2 : req.body.id1
	}
const _model = await  Model.deleted(payload);
 res.json(_model.output);
  
 
 }
}
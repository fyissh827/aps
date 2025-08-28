const Model = require('./model/index');
module.exports = {

 async grewtale_delete(req, res, next){	
 const payload = {
	 id : req.body.id
 }
const _model = await  Model.grewtale_delete(payload);
    res.json(_model.output);

 }
}
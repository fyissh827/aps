const Model = require('./model/index');


module.exports = {
async past_plotter_delete(req, res){
	const payload ={
		user_id : req.userData.userId,
		id : req.body.id,
		button : req.body.button,
		active : req.body.active,
		plotter_id : req.body.plotter_id,
		type : req.body.type
		
	};
const _model = await  Model.deleted_past(payload);
   
   res.json(_model.output);

 }
}


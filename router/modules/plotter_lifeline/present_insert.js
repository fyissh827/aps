const Model = require('./model/index');


module.exports = {
async present_plotter_insert(req, res){
	const payload ={
		user_id : req.userData.userId,
		id : req.body.id,
		
	};
const _model = await  Model.insert_present(payload);
   
   res.json(_model.output);

 }
}

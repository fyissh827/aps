const Model = require('./model/index');

module.exports = {

async notification_count_destroyed (req, res)  {
const payload ={
	user_id : req.userData.userId,
   from :req.body.from
}
const _model = await  Model.destroyed(payload);
console.log(_model);
   res.json(_model.output);
  
}



}
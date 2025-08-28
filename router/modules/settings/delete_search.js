const Model = require('./model/index');
module.exports = {

async _delete (req, res)  {
	const payload = {
		 _m : req.userData.userId
	};
		const _model = await  Model.delete_search(payload);
   
   res.json(_model.output);

		
	 
	}
}
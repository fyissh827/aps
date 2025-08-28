const Model = require('./model/index'); 
const {nextFormation} = require('../../../managers/process');
module.exports = {

async connectors_get (req, res)  {
	const payload ={
		
		user_id : req.userData.userId,
		id : req.body.id,
		length : req.body.length,
		next  : req.body.next
	};
	const r = await process(payload);
 res.json(r);
  
},
 async process(d){return process(d)}
};
async function process(d) {
	const _model = await  Model.suggestion(d);
	var _final_again = [];
   if(_model.output === 'Error' || _model.output === 'Nothing'){
	   _final_again = 'nothing'
   }else{
	   
	  _final_again =  {data : _model.output,
	                    next : nextFormation(_model.output, d)}
   }
	 return _final_again;
  }
const Model = require('./model/index'); 
const {nextFormation} = require('../../../managers/process');
module.exports = {

async notification_get(req, res, next)  {
	const payload = {
		  
          length : req.body.length,
         id : req.userData.userId,
		 next  : req.body.next
	};
	const r = await process(payload);
	res.json(r);
	
},
async process(d){return process(d)}
};
async function process(payload){
	
	const _model = await  Model.get1(payload);
 const access = _model.output;
 
 if(access === 'Error' || access === 'Nothing'){  
	
		 var ac = 'nothing'
		}else{
			
			 ac = {
				 data : access,
				 next : nextFormation(access, payload)
			 }
			}
	 return ac;
  }
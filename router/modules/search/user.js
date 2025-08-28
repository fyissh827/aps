const Model = require('./model/index');
const {nextFormation} = require('../../../managers/process');
module.exports = {

async user (req, res){
	var payload = {
		_h : req.body.query,
		length : req.body.length,
		_m : req.userData.userId,
		next  : req.body.next
	}; 
    const r = await process(payload);
	res.json(r);
 },
 async process(d){return process(d)}
};
async function process(payload){
	const _model = await  Model.user(payload);
   
	const data = _model.output;
	console.log(data);
	if(data === 'nothing' || data === 'Error' || data === 'Bug'){
		
	 var ac =  {data : 'nothing'}
		
		
	}else{
	   
			ac = {data : data,
				  next : nextFormation(data, payload)}
		
	}
	 return ac;
  }
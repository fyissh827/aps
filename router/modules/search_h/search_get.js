const Model = require('./model/index');

module.exports = {

async search_get(req, res, next){
	const payload = {
		user_id : req.userData.userId,
		items : 4,
		offset : 0 
	};
	const r = await process(payload);
	res.json(r);
   
},
async process(d){return process(d)}
}
async function process(payload){
	const ac = await  Model.get(payload);
	console.log(ac.output);
	 return ac.output;
	
  }
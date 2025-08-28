
const { me } = require('./model/index');

module.exports = {

async me(req, res){
	const payload = {
  id : req.userData.userId
  };
  const r = await process(payload);
  res.json(r);
},
async process(d){ console.log(d); return process(d)}
}
async function process(payload){
	const _model = await me(payload);
if(_model === 'Error'){
 var output = 'Error'
}else{
  output = _model.output;
}
	 return output;
  }
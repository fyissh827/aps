const Model = require('./model/index_alpha');
const tester = require('../../modules/tester');
const {nextFormation} = require('../../../managers/process');
module.exports = {
async grewtale (req, res, next){	
 const ob  = [];
 const payload = {
	length : req.body.length,
    items : req.body.items,
    user_id	: req.userData.userId,
	_p : req.body.p_id,
  next : req.body.next
 };
 const r = await process(payload);
 res.json(r);


},
async process(d){return process(d)}
};
async function process(d){
  const _model = await  Model.competition_g(d);
  const access = _model.output;
  if (access === 'Nothing')
  {
  var ac = 'nothing'
  }else{
    ac  = tester.system("_", access);
    
     
} 
 var load = {
   data : ac,
   next : nextFormation(ac, d)
  
 }
   return load;
}
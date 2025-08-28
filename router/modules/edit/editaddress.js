const con = require('../../../database/index.js'); 
const Model = require('./model/index');
//const { SetUserData } = require('../../../redis/index.js'); 
module.exports = {

async edit_address(req, res){
 const payload ={
 user_id : req.userData.userId,
  lat : req.body.lat,
  lon : req.body.lon,
   address : req.body.address 
 }	;
	

const _model = await  Model.address_update(payload);
   
if(_model.output === 'Updated'){
  var output = 'Your address has been Updated.'
   
   }
   else if(_model.output !== 'Updated' )output = 'Error'
   
   
   
   
   
   
   
   
   
      res.json(output);
  



return;}


}
 const con = require('../../../database/index.js'); 

const Model = require('./model/index');

const { SetUserData } = require('../../../redis/index.js'); 
module.exports = {

async edit_profile(req, res){
	
	
	
	
const payload = {
 id : req.userData.userId,
  firstname : req.body.first_name,
  lastname : req.body.last_name,
  role : req.body.role,
   gender : req.body.gender
 };
 
 




const _model = await  Model.profile_update(payload);
   
if(_model.output === 'Updated'){
var userData = req.body.full_user;
userData.first_name = payload.firstname,
userData.last_name = payload.lastname,
userData.role = payload.role,
userData.gender = payload.gender;
const value = await SetUserData(userData);
if(value === true) var output = 'Updated'

}
else if(_model.output !== 'Updated' || value !== true)output = 'Error'









   res.json(output);

 }


}
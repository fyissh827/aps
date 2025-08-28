const con = require('../../../../database/index.js'); 
const _  = require('lodash');
const bcrypt = require('bcrypt');
const _output = require('../../../../output/index.js');
const generateUniqueId = require('generate-unique-id');
const {
	Users, 
	Settings
 } = require("../../models/index.js"); 
 

 const signup = async(payload) => {
  
    var _final_p = [];
    var _final = [];
    var  output = [];
   
    const fn = payload.first_name;    
	const fn_l = fn.length;
	const id_l = Math.round(14 - fn_l);
	const Uid = generateUniqueId({ length: id_l, useLetters: false });
     const _username = fn.slice(0, 4) + '_' + `${Uid}`
   


		  try{
			var process = Users.build({
				first_name: payload.first_name,
				last_name: payload.last_name,
				email : payload.email	,
				password: payload.password,
				year: payload.year,
				month : payload.month,
				date: payload.date,
				username:	_username,
				verified : JSON.stringify(payload.verified)
			});
			var row = await process.save();

	   _final_p = row;
	  
	  }catch(e){
		  
		  	_final_p = 'Bug';
	  }
	   if(_final_p == undefined || _final_p === 'Bug'){
		  output = 'Error'
	  }
	  else if(_final_p.length === 0){
		  output = 'Nothing' 
	  }else {
		  const u_id = _final_p.dataValues.id;
		  
		   try{
			 process = Settings.build({
				user_id: u_id,
				privacy: "0",
				search_history : "0"
				
			});
			 row = await process.save();
	    
	    _final = row;
		
	  }catch(e){
		  
		  	_final = 'Bug'
	  }
		  if(_final == undefined || _final === 'Bug'){
		  output = 'Error'
	  }
	  else if(_final.length === 0){
		  output = 'Nothing' 
	  }else {
		 
		  output = {
			  'send' : true,
			  'id' :_final_p.dataValues.id,
			  'username' : _username.at,
			  'userData' : _final_p.dataValues
		  }
	  }
	  }
	  
	  
	  
	  
	 
	  
	  
	  
	  
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};



const login = async(payload) =>  {
	var _final = [];
	var output = [];
try {
 const [row ,fields] = await con.execute(`SELECT * FROM users WHERE email = '${payload.email}' AND u_status = '0'`);
 _final = row;
 
 }
 catch(err){
	 _final = 'Bug'
 }
 
 if(_final == undefined){
		  output = 'Error'
	  }
	  else if(_final.length === 0){
		  output = 'Nothing' 
	  }else {
		  output = _final
	  }
	  return {
		  output
	  }
};

module.exports ={ signup, login }



const con = require('../../../../database/index.js'); 
const _  = require('lodash');
const _output = require('../../../../output/index.js');
const {
	GlobalComment
 } = require("../../models/index.js");
  
 

  async function _insert (payload){
 
    var _final = [];
    var  output = [];
	
try {
	const process = GlobalComment.build({
		user_id: payload.user_id,
		primitive_id: payload.primitive_id,
		accelerator: payload.accelerator,
		grewtale:payload.grewtale,
		message: payload.message,
		type : payload.type,
		file: payload.obj,
		file_type: payload.file_type,
		standard: payload.standard,
		iso : payload.iso,
		point : payload.point,
		report : "0",
		
		
	});
	const row = await process.save();
 
       _final = row;
 
 }
	  
	  catch(e){
		_final = 'Bug'
	  }
	  if(_final == undefined || _final === 'Bug'){
		  output = {
			msg : 'Error',
			id : 	'0'	  }
	  }
	  else if(_final.length === 0){
		  output = {
			msg : 'Nothing',
			id : 	'0'	  } 
	  }else {
		  output = {
			  msg :  'Commented',
			  id : 	_final.dataValues.id	  }
		  
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};
async function get(payload){
    
    var _final_p = [];
    var _final = [];
	var  output = [];
    var  active = '';
	var __output =[];
	var  p = '';
	if(payload.next !== null)p = `AND global_comment.id < ${payload.next}`;
	
try {
 const [row, err] = await con.query(`SELECT  global_comment.id, global_comment.accelerator, global_comment.grewtale, global_comment.primitive_id, global_comment.type , global_comment.user_id AS person,  global_comment.message,  global_comment.standard, global_comment.file, global_comment.file_type, global_comment.c_status, global_comment.iso, global_comment.point,  global_comment.created_at , users.username, users.first_name, users.last_name, users.profilepic, users.u_status  FROM global_comment , users WHERE global_comment.user_id = users.id
  AND  global_comment.primitive_id = '${payload.primitive_id}' AND global_comment.c_status = '0' ${p}  ORDER BY global_comment.point DESC LIMIT ${payload.length} `);
  _final_p = row;
  console.log(row);
}catch(e){
		_final_p = 'Bug'
	  }
	  if(_final_p == undefined || _final_p === 'Bug'){
		  output = 'Error'
	  }
	  else if(_final_p.length === 0){
		  output = 'Nothing' 
	  }else {
		 output = _final_p
		 
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};


async function get_type(payload){
    
    var _final_p = [];
    var _final = [];
	var  output = [];
    var  active = '';
	var __output =[];
	var  p = '';
	if(payload.next !== null)p = `AND global_comment.id < ${payload.next}`;
	
try {
 const [row, err] = await con.query(`SELECT  global_comment.id, global_comment.accelerator, global_comment.grewtale, global_comment.primitive_id, global_comment.type , global_comment.user_id AS person,  global_comment.message,  global_comment.standard, global_comment.file, global_comment.file_type, global_comment.c_status, global_comment.iso, global_comment.point,  global_comment.created_at , users.username, users.first_name, users.last_name, users.profilepic, users.u_status  FROM global_comment , users WHERE global_comment.user_id = users.id
  AND  global_comment.primitive_id = '${payload.primitive_id}' AND global_comment.c_status = '0' AND global_comment.type = '${payload.type}' ${p} ORDER BY global_comment.point DESC LIMIT ${payload.length} `);
  _final_p = row;
  console.log(row);
}catch(e){
		_final_p = 'Bug'
	  }
	  if(_final_p == undefined || _final_p === 'Bug'){
		  output = 'Error'
	  }
	  else if(_final_p.length === 0){
		  output = 'Nothing' 
	  }else {
		 output = _final_p
		 
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};

async function _delete(payload){
    
    var _final_p = [];
    var _final = [];
	var  output = [];
    var  active = '';
	var __output =[];
	
	
try {
 const [row, err] = await con.query(`UPDATE global_comment SET c_status = '1' WHERE id = '${payload.id}';`);
  _final_p = row;
}catch(e){
		_final_p = 'Bug'
	  }
	  if(_final_p == undefined || _final_p === 'Bug'){
		  output = 'Error'
	  }
	  else if(_final_p.length === 0){
		  output = 'Nothing' 
	  }else {
		 output = 'Deleted'
		 
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};



module.exports ={ _insert, get, _delete, get_type }



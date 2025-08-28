const con = require('../../../../database/index.js'); 
const _  = require('lodash');
const _output = require('../../../../output/index.js');

  
 

  async function user(payload){
  
    var _final = [];
    var _final_p = [];
    var  output = [];
    var  _re = [];
	
try {
 const [row, err] = await con.query(`SELECT connectors.*, users.username, users.u_status, users.first_name, users.last_name, users.profilepic, users.email, users.phone, users.year, users.month, users.date, users.role, users.online, users.online_at, users.address, settings.privacy, settings.user_id FROM settings , users LEFT JOIN connectors ON connectors.user_1 = users.id AND connectors.user_2 = '${payload.user_id}' OR connectors.user_2 = users.id AND connectors.user_1 = '${payload.user_id}' WHERE settings.user_id = users.id AND username = '${payload.username}' AND u_status = '0'`);
       _final_p = row;
    console.log(row);
 }
	  
	  catch(e){
		  console.log
		_final_p = 'Bug'
	  }
	  if(_final_p === undefined || _final_p == 'Bug' ){
		  output = 'Error'
	  }
	  else if(_final_p.length === 0){
		  output = 'Nothing' 
	  }else {
		
		
	    
	
		  output = {_final_p } 
	  }
	 
 await _output.response(output);

  return {
	 
	 output 
	  
	  };

};

async function subject(payload){
	
	 var _final = [];
    var  output = [];
	
try {
 const [row, fields] = await con.execute(`SELECT subject.id, subject.name, subject.meaning, subject.type, subject.file, subject.file_type, subject.created_at, users.username FROM users INNER JOIN subject ON subject.user_id = users.id WHERE username = '${payload._m}' ORDER BY subject.id DESC`);
  _final = row;
 }
	  catch(e){
		_final = 'Bug'
	  }
	  if(_final == undefined){
		  output = 'Error'
	  }
	  else if(_final.length === 0){
		  output = [] 
	  }else {
		  output = _final
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};
async function grewtales(payload){
    
    var _final_p = [];
    var _final = [];
	var measure = [];
	var  output = [];
    var  active = '';
	var __output =[];
	var  p = '';
	if(payload.next !== null) p = `AND grewtales.id < ${payload.next}`
	
try {
 const [row, err] = await con.query(`SELECT  grewtales.id, grewtales.accelerator, grewtales.w_n, grewtales.g_status , grewtales.user_id AS person,  grewtales.type, SUBSTRING(grewtales.content, 1, 250) AS content, CASE WHEN CHAR_LENGTH(grewtales.content) > 249 THEN false ELSE true END AS fullContentAvailibility, grewtales.standard, grewtales.privacy, grewtales.primitive_id, grewtales.created_at ,grewtales_file.file_type, grewtales_file.webMeta, grewtales_file.file, grewtales.p1, grewtales.p2, grewtales.p3, grewtales.p4, grewtales.p5, grewtales.p6, grewtales.p7, grewtales.p8, grewtales.p0, users.username, users.first_name, users.last_name, users.profilepic, users.u_status, grews.title , plotters.button_value AS active , plotters.id AS plotterValueId   FROM grewtales_file , grews, users, grewtales LEFT JOIN plotters ON plotters.grewtale_id = grewtales.id AND plotters.user_id = '${payload.user_id}'  WHERE grewtales.id = grewtales_file.parent AND  grewtales.user_id = users.id AND grewtales.primitive_id = grews.primitive_id AND users.username = '${payload._h}' AND grewtales.g_status = '0' AND users.u_status = '0' ${p} ORDER BY grewtales.id DESC LIMIT ${payload.length}`);
  _final_p = row;
}catch(e){
	
		_final_p = 'Bug'
	  }
	  if(_final_p == undefined){
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
async function grewtale_delete(payload){
	
	
	 var _final_p = [];
	 var _final = [];
    var  __output = [];
    var  output = [];
	
try {
 const [row, fields] = await con.execute(`UPDATE  grewtales SET g_status = '1' , suspended = now() WHERE id = '${payload.id}'`);
  _final_p = row;
 }
	  catch(e){
		_final_p = 'Bug'
	  }
	  if(_final_p == undefined){
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



module.exports ={ user, subject, grewtales, grewtale_delete }



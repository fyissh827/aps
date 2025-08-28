const con = require('../../../../database/index.js'); 
const _  = require('lodash');
const _output = require('../../../../output/index.js');

  
 

async function past(payload){
    
    var _final_p = [];
    var _final = [];
	var  output = [];
    var  active = '';
	var __output =[];
	var measure = []
	var g = ''
     var  p = '';
	
	 if(payload.next !== null) p = `AND past.id < ${payload.next}`

try {
 const [row, err] = await con.query(`SELECT  past.id, past.name, past.type,  past.file, past.file_type, past.date_1st, past.date_2nd, past.date_type, past.location, SUBSTRING(past.how, 1, 65) AS how, SUBSTRING(past.try, 1, 65) AS try,  SUBSTRING(past.story, 1, 65) AS story,  past.b1, past.b2, past.b3, past.created_at,past_value.id AS active_id, past_value.value AS active, users.username, users.id AS user_id FROM users , past LEFT JOIN past_value ON past_value.past_id = past.id AND past_value.user_id = '${payload.user_id}'  WHERE past.user_id = users.id AND users.username = '${payload._m}' ${p} ORDER BY past.id DESC LIMIT ${payload.length}  `);
  _final_p = row;
}catch(e){
	console.log(e);
		_final_p = 'Bug'
	  }
	  if(_final_p == undefined || _final_p === 'Bug'){
		  output = 'Error'
	  }
	  else if(_final_p.length === 0){
		  output = 'Nothing' 
	  }else {
		

		
		  
		 //__output.push({active :active, data : actual});	
		output = _final_p;
	  }
	  
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};  

async function present(payload){
    
    var _final_p = [];
    var _final = [];
	var  output = [];
    var  active = '';
	var __output =[];
	var measure = []
	var  p = '';
	
	 if(payload.next !== null) p = `AND present.id < ${payload.next}`
	
try {
 const [row, err] = await con.query(`SELECT  present.id, present.name, present.type,  present.file, present.file_type, present.date_1st, present.date_2nd, present.date_type, present.location, SUBSTRING(present.how, 1, 65) AS how, SUBSTRING(present.try, 1, 65) AS try,  SUBSTRING(present.story, 1, 65) AS story, present.b1, present.b2, present.b3, present.created_at,present_value.id AS active_id, present_value.value AS active, users.username, users.id AS user_id FROM users , present LEFT JOIN present_value ON present_value.present_id = present.id AND present_value.user_id = '${payload.user_id}'  WHERE present.user_id = users.id AND users.username = '${payload._m}' ${p} ORDER BY present.id DESC LIMIT ${payload.length}  `);
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
		output = _final_p;
	  }
	  
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};  
async function future(payload){
    
    var _final_p = [];
    var _final = [];
	var  output = [];
    var  active = '';
	var __output =[];
	var measure = []
	var  p = '';
	
	 if(payload.next !== null) p = `AND future.id < ${payload.next}`
	
try {
 const [row, err] = await con.query(`SELECT  future.id, future.name, future.type,  future.file, future.file_type,future.date_1st, future.date_2nd, future.date_type, future.location, SUBSTRING(future.try, 1, 65) AS try, future.b1, future.b2, future.b3, future.created_at,future_value.id AS active_id, future_value.value AS active, users.username, users.id AS user_id FROM users , future LEFT JOIN future_value ON future_value.future_id = future.id AND future_value.user_id = '${payload.user_id}'  WHERE future.user_id = users.id AND users.username = '${payload._m}' ${p} ORDER BY future.id DESC LIMIT ${payload.length}   `);
  _final_p = row;
  console.log(row);
}catch(e){
	console.log(e);
		_final_p = 'Bug'
	  }
	  if(_final_p == undefined || _final_p === 'Bug'){
		  output = 'Error'
	  }
	  else if(_final_p.length === 0){
		  output = 'Nothing' 
	  }else {
		output = _final_p;
	  }
	  
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};
async function past_delete(payload) {

	
	 var _final = [];
    var  output = [];
	
try {
  const [row, fields] = await con.query(`DELETE FROM ${payload.type} WHERE id = '${payload.id}'` );
   _final = row;
 }
	  catch(e){
		_final = "Bug"
	  }
	  if(_final == undefined || _final === 'Bug'){
		  output = {
			msg : 'Error'
		}
	  }
	  else if(_final.length === 0){
		  output = 'Nothing' 
	  }else {
		  output = 'Deleted'
		 
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};


  



module.exports ={ past, present , future, past_delete }



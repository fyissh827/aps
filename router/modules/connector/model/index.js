const con = require('../../../../database/index.js'); 
const _  = require('lodash');
const _output = require('../../../../output/index.js');

  
 

  async function accept(payload){
  
    var _final = [];
    var  output = [];
	
try {
 const [row, fields] = await con.query(`UPDATE connectors SET relation_status  = '2' , accept_at = now() WHERE id = '${payload.id}'` );
       _final = row;
 
 }
	  
	  catch(e){
		_final = 'Bug'
	  }
	  if(_final == undefined){
		  output = 'Error'
	  }
	  else if(_final.length === 0){
		  output = 'Nothing' 
	  }else {
		  output = {
			  msg : "Accepted"
		  } 
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};

async function deleted(payload){
	
	
	 var _final = [];
    var  output = [];
	
try {
 const [row, fields] = await con.execute(`DELETE FROM connectors WHERE (user_1 = '${payload.id2}' AND user_2 = '${payload.id1}') OR  user_2 = '${payload.id2}' AND (user_1 = '${payload.id1}')


`);
  _final = row;
 }
	  catch(e){
		_final = 'Bug'
	  }
	  if(_final == undefined){
		  output = 'Error'
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
async function requested(payload){
	
	
	 var _final_p = [];
	 var _final = [];
    var  __output = [];
    var  output = [];
	
try {
 const [row, fields] = await con.execute(`SELECT * from connectors WHERE user_1 = '${payload.user_id2}' AND user_2 =  '${payload.user_id1}' OR user_2 = '${payload.user_id2}' AND user_1 =  '${payload.user_id1}'`);
  _final_p = row;
 }
	  catch(e){
		_final_p = 'Bug'
	  }
	  if(_final_p == undefined){
		  output = 'Error'
	  }
	  else if(_final_p.length === 0){
		 try {
 const [_row, _fields] = await con.execute(`INSERT INTO connectors(user_1, user_2 , relation_value, relation_status, propose_at) VALUES (
'${payload.user_id1}', '${payload.user_id2}', '${payload.relation_value}' , '1', now()
)`);
  _final = row;
 }
	  catch(e){
		_final = 'Bug'
	  }
	  if(_final == undefined){
		  __output = 'Error'
	  }
	  else if(_final.length === 0){
		  __output = 'Nothing' 
	  }else {
		__output = {
			  msg : "Requested"
		  } 
	  } 
	  output = __output
	  }else {
	   output = 'Nothing'	
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};



module.exports ={ accept, deleted, requested }



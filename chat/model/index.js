const con = require('../../../../database/index.js'); 
const _  = require('lodash');
const _output = require('../../../../output/index.js');

  
 


async function connector_get2(payload) {

	
	 var _final = [];
    var  output = [];
	
try {
  const [row, fields] = await con.query(`SELECT connectors.id, connectors.relation_value, users.username, users.first_name, users.last_name,  users.profilepic, users.u_status FROM connectors INNER JOIN users ON connectors.user_1  = users.id WHERE user_2 = ${payload.id}  AND relation_status = '2' AND u_status = '0' ORDER BY connectors.id DESC LIMIT ${payload.limit} OFFSET ${payload._l2}` );
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
		  output = _final
		 
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};

async function connector_get(payload) {

	
	 var _final = [];
    var  output = [];
	
try {
  const [row, fields] = await con.query(`SELECT connectors.id, connectors.relation_value,  users.username, users.first_name, users.last_name, users.profilepic, users.u_status  FROM connectors INNER JOIN users ON connectors.user_2  = users.id WHERE user_1 = '${payload.id}'  AND relation_status = '2' AND u_status = '0' ORDER BY connectors.id DESC LIMIT ${payload.limit} OFFSET ${payload._l1}` );
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
		  output = _final
		 
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};
  



module.exports ={connector_get , connector_get2 }



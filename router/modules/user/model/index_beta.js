const con = require('../../../../database/index.js'); 
const _  = require('lodash');
const _output = require('../../../../output/index.js');

  
 




async function connector_get(payload) {

	
	 var _final = [];
    var  output = [];
	console.log(payload);
	var  p = '';
	if(payload.next !== null)p = `AND connectors.id < ${payload.next}`;
try {
  const [row, fields] = await con.query(`SELECT users.id AS user_id, users.first_name, users.username, users.id ,users.last_name, users.profilepic, connectors.id AS id, connectors.relation_value, connectors.user_2 FROM users, connectors WHERE (connectors.user_1 =  users.id AND connectors.user_2 = '${payload.id}' OR connectors.user_2 =  users.id AND connectors.user_1 = '${payload.id}') AND connectors.relation_status = '2' AND connectors.status = '1' AND users.u_status = '0' ${p}  ORDER BY connectors.id DESC LIMIT ${payload.length}` );
   _final = row
   console.log(row);
 }
	  catch(e){
		  console.log(e);
		_final = e
	  }
	  if(_final == undefined || _final === 'Bug'){
		  output = 'Nothing'
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
  



module.exports ={connector_get  }



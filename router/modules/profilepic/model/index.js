const con = require('../../../../database/index.js'); 
const _  = require('lodash');
const _output = require('../../../../output/index.js');

  
 

  async function update (payload){
  
    var _final = [];
    var  output = [];
	
try {
 const [row, fields] = await con.query(`UPDATE users SET profilepic = '${payload.profilepic}', profile_update = now()   WHERE id = '${payload.user_id}'` );
       _final = row;
 
 }
	  
	  catch(e){
		_final = 'Bug'
	  }
	  if(_final == undefined || _final === 'Bug'){
		  output = 'Error'
	  }
	  else if(_final.length === 0){
		  output = 'Nothing' 
	  }else {
		  output = 'Updated'
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};

const deleted = async(payload) =>  {
	const access = _.forIn(payload);
	
	 var _final = [];
    var  output = [];
	
try {
 const [row, fields] = await con.execute(`UPDATE  users SET profilepic = '1.svg' WHERE id = '${payload._m}'`);
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
		  output = 'Removed'
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};



module.exports ={ update, deleted }



const con = require('../../../../database/index.js'); 
const _  = require('lodash');
const _output = require('../../../../output/index.js');
const  date = require('date-and-time');
  
 

  async function get (payload){
  
    var _final = [];
    var  output = [];
	var  p = '';
	
	
try {
    
 const [row, fields] = await con.query(`SELECT id, user_id, rules from user_messaging_rules WHERE user_id = ${payload.userId}`);
       console.log(row);
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
		  output = _final
	  }
 await _output.response(output);
   
  return {
	 
	 output
	  
	  };

};


module.exports ={ get  }
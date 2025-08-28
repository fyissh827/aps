const con = require('../../../../database/index.js'); 
const _  = require('lodash');
const _output = require('../../../../output/index.js');

  
 

  async function city(payload){
  
    var _final = [];
    var  output = [];
	
try {
 const [row, fields] = await con.query(`SELECT * FROM cities WHERE state_id = '${payload.id}'` );
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

async function state(payload){
  
    var _final = [];
    var  output = [];
	
try {
 const [row, fields] = await con.query(`SELECT * FROM states WHERE country_id = '${payload.id}'` );
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

async function country(payload){
  
    var _final = [];
    var  output = [];
	
try {
 const [row, fields] = await con.query(`SELECT * FROM countries` );
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



module.exports ={ city, state,  country }



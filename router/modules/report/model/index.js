const con = require('../../../../database/index.js'); 
const _  = require('lodash');
const Joi = require('joi');
const _output = require('../../../../output/index.js');

  
 



async function report_grewtale(payload) {

	
	 var _final = [];
    var  output = [];
	
try {
  const [row, fields] = await con.query(`UPDATE grewtales SET report  = report + 1  WHERE id = '${payload.id}'` );
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
		  output = {
			msg : 'Submitted'
		}
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};

async function report_comment(payload) {

	
	var _final = [];
   var  output = [];
   
try {
 const [row, fields] = await con.query(`UPDATE global_comment SET report  = report + 1 WHERE id = '${payload.id}'` );
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
		 output = {
		   msg : 'Submitted'
	   }
	 }
await _output.response(output);

 return {
	
	output
	 
	 };

};



module.exports ={ report_grewtale, report_comment }



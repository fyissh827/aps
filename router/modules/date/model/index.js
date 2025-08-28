const con = require('../../../../database/index.js'); 
const _  = require('lodash');
const output = require('../../../../output/index.js');



async function date(payload)  {
	var _final = [];
	var output = [];
try {
 const [row ,fields] = await con.execute(`SELECT * FROM dates`);
 _final = row;
 
 }
 catch(err){
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
	  return {
		  output
	  }
};
async function year(payload)  {
	var _final = [];
	var output = [];
try {
 const [row ,fields] = await con.execute(`SELECT * FROM year`);
 _final = row;
 
 }
 catch(err){
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
	  return {
		  output
	  }
};

module.exports ={ date, year }



const con = require('../../../../database/index.js'); 
const _  = require('lodash');
const _output = require('../../../../output/index.js');

  
 

  async function search(payload){
  
    var _final = [];
    var  output = [];
	
try {
 const [row, fields] = await con.query(`UPDATE settings SET search_history = '${payload._h}' WHERE user_id = '${payload._m}'` );
       _final = row;
 
 }
	  
	  catch(e){
		_final = 'Bug'
	  }
	  if(_final == undefined || _final === 'Bug'){
		  output =  'Error'
	  }
	  else if(_final.length === 0){
		  output =  'Nothing' 
	  }else {
		  output = 'Updated search functioning'
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};
async function vibration(payload){
  
    var _final = [];
    var  output = [];
	
try {
 const [row, fields] = await con.query(`UPDATE settings SET vibration = '${payload._h}' WHERE user_id = '${payload._m}'` );
       _final = row;
 
 }
	  
	  catch(e){
		_final = 'Bug'
	  }
	  if(_final == undefined || _final === 'Bug'){
		  output =  'Error'
	  }
	  else if(_final.length === 0){
		  output =  'Nothing' 
	  }else {
		  output = 'Updated vibration functioning'
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};
async function sound(payload){
  
    var _final = [];
    var  output = [];
	
try {
 const [row, fields] = await con.query(`UPDATE settings SET sound = '${payload._h}' WHERE user_id = '${payload._m}'` );
       _final = row;
 
 }
	  
	  catch(e){
		_final = 'Bug'
	  }
	  if(_final == undefined || _final === 'Bug'){
		  output =  'Error'
	  }
	  else if(_final.length === 0){
		  output =  'Nothing' 
	  }else {
		  output = 'Updated sound functioning'
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};

async function get(payload){
	const access = _.forIn(payload);
	
	 var _final = [];
    var  output = [];
	
try {
 const [row, fields] = await con.execute(`SELECT * FROM settings WHERE user_id = ${payload._h}`);
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
		  output = _final
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};

async function privacy(payload){
	const access = _.forIn(payload);
	
	 var _final = [];
    var  output = [];
	
try {
 const [row, fields] = await con.execute(`UPDATE settings SET privacy = '${payload._h}' WHERE user_id = '${payload._m}'`);
  _final = row;
 }
	  catch(e){
		_final = 'Bug'
	  }
	   if(_final == undefined || _final === 'Bug'){
		  output =  'Error'
	  }
	  else if(_final.length === 0){
		  output =  'Nothing' 
	  }else {
		  output =  'Updated privacy'
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};
async function messaging(payload){
	const access = _.forIn(payload);
	
	 var _final = [];
    var  output = [];
	
try {
 const [row, fields] = await con.execute(`UPDATE settings SET messaging = '${payload._h}' WHERE user_id = '${payload._m}'`);
  _final = row;
 }
	  catch(e){
		_final = 'Bug'
	  }
	   if(_final == undefined || _final === 'Bug'){
		  output =  'Error'
	  }
	  else if(_final.length === 0){
		  output =  'Nothing' 
	  }else {
		  output =  'Updated messaging.'
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};
async function delete_search(payload){
	const access = _.forIn(payload);
	
	 var _final = [];
    var  output = [];
	
try {
 const [row, fields] = await con.execute(`DELETE FROM search_history WHERE user_id = '${payload._m}'`);
  _final = row;
 }
	  catch(e){
		_final = 'Bug'
	  }
	   if(_final == undefined || _final === 'Bug'){
		  output =  'Error'
	  }
	  else if(_final.length === 0){
		  output =  'Nothing' 
	  }else {
		  output =  'Deleted'
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};
async function deactivate_user(payload){
	const access = _.forIn(payload);
	
	 var _final = [];
    var  output = [];
	
try {
 const [row, fields] = await con.execute(`UPDATE users SET u_status  = '1' WHERE id  = '${payload._m}'`);
  _final = row;
 }
	  catch(e){
		_final = 'Bug'
	  }
	   if(_final == undefined || _final === 'Bug'){
		  output =  'Error'
	  }
	  else if(_final.length === 0){
		  output =  'Nothing' 
	  }else {
		  output =  'Deleted'
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};
async function password_check(payload){
	 var _final = [];
    var  output = [];
	
try {
 const [row, fields] = await con.execute(`SELECT password FROM users WHERE id = '${payload.id}';`);
  _final = row;
 }
	  catch(e){
		_final = 'Bug'
	  }
	   if(_final == undefined || _final === 'Bug'){
		  output =  'Error'
	  }
	  else if(_final.length === 0){
		  output =  'Nothing' 
	  }else {
		  output =  
		  _final[0]
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};

async function password_update(payload){
	 var _final = [];
    var  output = [];
	
try {
 const [row, fields] = await con.execute(`UPDATE users SET password = '${payload.hash}' WHERE id = '${payload.id}';`);
  _final = row;
 }
	  catch(e){
		_final = 'Bug'
	  }
	   if(_final == undefined || _final === 'Bug'){
		  output =  'Error'
	  }
	  else if(_final.length === 0){
		  output =  'Nothing' 
	  }else {
		  output =  'Updated'
		  
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};
async function messaging_rules_delete(payload){
	var _final = [];
   var  output = [];
   
try {
const [row, fields] = await con.execute(`DELETE FROM user_messaging_rules WHERE user_id = '${payload._m}'`);
 _final = row;
}
	 catch(e){
	   _final = 'Bug'
	 }
	  if(_final == undefined || _final === 'Bug'){
		 output =  'Error'
	 }
	 else if(_final.length === 0){
		 output =  'Nothing' 
	 }else {
		 output =  'Deleted'
		 
	 }
await _output.response(output);

 return {
	
	output
	 
	 };

};

module.exports ={ search, vibration, sound, get, privacy, delete_search, deactivate_user, password_check ,password_update, messaging, messaging_rules_delete }



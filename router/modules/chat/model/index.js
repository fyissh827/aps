const con = require('../../../../database/index.js'); 
const _  = require('lodash');
const _output = require('../../../../output/index.js');
const {
   PrivateMessage
} = require("../../models/index.js");
  
 

  async function _insert (payload){
    var _prefinal = [];
    var _final = [];
    var  output = [];
	





try {

	const process = PrivateMessage.build({
		sender: payload.user1,
		reciever: payload.user2,
		accelerator: payload.accelerator,
		message: payload.message,
		file: payload.obj,
		file_type : payload.file_type,
		url: payload.url,
		seen: "0",
		status: "0",
		messageType: payload.messageType,
        objType: payload.objType,
        objId: payload.objId,
		created_at: payload.selected_id,
		
	});
	const row = await process.save();
    _final = row;
	
 
 }
	  
	  catch(e){
		
		_final = 'Bug'
	  }
	  if(_final == undefined || _final === 'Bug'){
		  output = {
			msg : 'Error',
			id : 	'0',
		    selected_id : payload.selected_id,
			user_id : payload.user2	  }
	  }
	  else if(_final.length === 0){
		  output = {
			msg : 'Nothing',
			id : 	'0',
			selected_id : payload.selected_id,
		    user_id : payload.user2	  } 
	  }else {
		  output = {
			  msg :  'messaged',
			  id : 	_final.dataValues.id,
			 selected_id : payload.selected_id,
			  filename : payload.obj,
			  user_id : payload.user2	  }
		  
	  }
	
 await _output.response(output);
 
  return {
	 
	 output
	  
	  };

};

async function _get_count(payload){
    
    var _final_p = [];
    var _final = [];
	var  output = [];
    var  active = '';
	var __output =[];
	
	
try {
 const [row, err] = await con.query(`SELECT COUNT(id) private_message WHERE  reciever = '${payload.user1}' AND seen = '0'`);
  _final_p = row;
}catch(e){
		_final_p = 'Bug'
	  }
	  if(_final_p == undefined || _final_p === 'Bug'){
		  output = 'Error'
	  }
	  else if(_final_p.length === 0){
		  output = 'Nothing' 
	  }else{
		 output = _final_p
		 
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};
async function _get(payload){
    
    var _final_p = [];
    var _final = [];
	var  output = [];
    var  active = '';
	var __output =[];
	var  p = '';
	if(payload.next !== null)p = `AND pm.id < ${payload.next}`
	console.log(p);
try {
 const [row, err] = await con.query(`SELECT rp.id AS r_id, rp.seen AS r_seen, rp.message AS r_message, rp.file AS r_file, rp.file_type AS r_file_type, rp.seen AS r_seen, pm.id, pm.sender, CASE WHEN pm.sender = '${payload.user1}' THEN 'true' else 'false' END AS fromSelf , pm.reciever, pm.message, pm.accelerator, pm.file, pm.file_type, pm.status , pm.seen, pm.url, pm.messageType, pm.objType, pm.objId, pm.created_at FROM private_message pm LEFT JOIN private_message rp ON rp.id = pm.accelerator WHERE (pm.sender = '${payload.user1}' AND pm.reciever = '${payload.user2}' AND pm.status = '0' OR pm.reciever = '${payload.user1}' AND pm.sender = '${payload.user2}' AND pm.status = '0') ${p} ORDER BY pm.id DESC LIMIT ${payload.length} `);
  _final_p = row;
}catch(e){
		_final_p = e 
	  }
	  if(_final_p == undefined || _final_p === 'Bug'){
		  output = 'Error'
	  }
	  else if(_final_p.length === 0){
		  output = 'Nothing' 
	  }else{
		 output = _final_p
		 
	  }
	 
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};
async function _getsingle(payload){
    
    var _final_p = [];
    var _final = [];
	var  output = [];
    var  active = '';
	var __output =[];
	
	
try {
 const [row, err] = await con.query(`SELECT rp.id AS r_id, rp.message AS r_message, rp.file AS r_file, rp.file_type AS r_file_type, rp.seen AS r_seen, pm.id, pm.sender, CASE WHEN pm.sender = '${payload.user1}' THEN 'true' else 'false' END AS fromSelf , pm.reciever, pm.message, pm.accelerator, pm.file, pm.file_type, pm.status , pm.seen, pm.url,pm.messageType, pm.objType, pm.objId, pm.created_at FROM private_message pm LEFT JOIN private_message rp ON rp.id = pm.accelerator WHERE pm.id = '${payload.id}' AND pm.status = '0'`);
  _final_p = row;
}catch(e){
		_final_p = e 
	  }
	  if(_final_p == undefined || _final_p === 'Bug'){
		  output = 'Error'
	  }
	  else if(_final_p.length === 0){
		  output = 'Nothing' 
	  }else{
		 output = _final_p
		 
	  }
	 
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};


async function _seen(payload){
    
    var _final_p = [];
    var _final = [];
	var  output = [];
    var  active = '';
	var __output =[];
	
	
try {
 const [row, err] = await con.query(`UPDATE private_message SET seen = '1' WHERE id = '${payload.id}'`);
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
		 output = _final_p
		 
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};

async function _delete(payload){
    
    var _final_p = [];
    var _final = [];
	var  output = [];
    var  active = '';
	var __output =[];
	
	
try {
 const [row, err] = await con.query(`UPDATE private_message SET status = '1' WHERE id = '${payload.id}';`);
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
		 output = 'Deleted'
		 
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};

async function _getusernew(payload){
    
    var _final_p = [];
    var _final = [];
	var  output = [];
    var  active = '';
	var __output =[];
	
	
try {
 const [row, err] = await con.query(`SELECT id, first_name, last_name, username, profilepic, online, socket_id, online_at FROM users WHERE id = '${payload.id}' AND u_status = '0';`);
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
		 output =  _final_p
		 
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};

async function _getuser(payload){
    
    var _final_p = [];
    var _final = [];
	var  output = [];
    var  active = '';
	var __output =[];
	var p  = '';
	 if(payload.next !== null)p = `AND message_id < ${payload.next}`
	
try {
 const [row, err] = await con.query(`with aps as
 ( SELECT   users.id, users.username, users.first_name, users.last_name, users.profilepic, users.online, users.socket_id, users.online_at, rp.id AS r_id, rp.message AS r_message, rp.file AS r_file, rp.file_type AS r_file_type, rp.seen AS r_seen, pm.seen, pm.accelerator, pm.status, pm.id AS message_id, pm.file, pm.file_type, pm.sender, pm.reciever, pm.url,pm.messageType, pm.objType, pm.objId, pm.created_at, pm.message, max(pm.id) over(PARTITION by  users.id) as rn from users, private_message  pm left join private_message rp on rp.id = pm.accelerator WHERE (pm.reciever = '${payload.user}' AND pm.sender = users.id) OR (pm.sender = '${payload.user}' AND pm.reciever = users.id))
 SELECT * from aps WHERE rn = message_id ${p} order by message_id DESC limit ${payload.length}`);
  _final_p = row;
   console.log(_final_p);
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
		 output =  _final_p
		 
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};




module.exports ={ _insert, _get, _delete, _seen, _get_count, _getuser, _getusernew, _getsingle }



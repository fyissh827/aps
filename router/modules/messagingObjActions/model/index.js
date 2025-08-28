const con = require('../../../../database/index.js'); 
const _  = require('lodash');
const _output = require('../../../../output/index.js');
const {
    user_messaging_requests
} = require("../../models/index.js");
  
 

  async function acceptMessagingRequest(payload){
  
    var _final = [];
    var  output = [];
	
try { 

	const [r, s] = await con.query(`UPDATE user_messaging_requests SET status= "2" WHERE id = ${payload.id}`);
		 _final = r;
}
	  
	  catch(e){
	   		_final =  'Bug'
	  }
	  if(_final == undefined || _final === 'Bug'){
		  output = 'Error'
	  }
	  else if(_final.length === 0){
		  output = 'Nothing' 
	  }else {
		  output =  'Updated'
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};
async function deleteMessagingRequest(payload){
  
    var _final = [];
    var  output = [];
	
	
try { 

	const [r, s] = await con.query(`DELETE FROM user_messaging_requests  WHERE id = ${payload.dataId}`);
		 _final = r;
}
	  
	  catch(e){
	
		_final =  'Bug'
	  }
	  if(_final == undefined || _final === 'Bug'){
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
async function sendMessagingRequest(payload){
  
    var _final = [];
    var  output = [];
	var _final2 = [];
    var  _final3 = [];
	
try { 
     
	const [r, s] = await con.query(`SELECT *  FROM connectors  WHERE ((user_1 = ${payload.userTo} && user_2 =${payload.userFrom}) || 
	(user_2 = ${payload.userTo} && user_1  = ${payload.userFrom}) && status = '1' && relation_status = '2' )`);
		 _final = r;
		 
}
	  
	  catch(e){
	   
		_final =  'Bug'
	  }
	  if(_final == undefined || _final === 'Bug'){
		  output = 'Error'
	  }
	  else if(_final.length === 0){
		try { 
			
				const [r, s] = await con.query(`SELECT *  FROM user_messaging_requests  WHERE (user_to = ${payload.userTo} && user_from =${payload.userFrom}) || 
				(user_from = ${payload.userTo} && user_to  = ${payload.userFrom}) `);
					 _final2 = r;
									 
			}
				  
				  catch(e){
				  
					_final2 =  'Bug'
				  }
				  if(_final2 == undefined || _final2 === 'Bug'){
					output = 'Error'
				}
				else if(_final2.length === 0){
				  
					try { 
						const process = user_messaging_requests.build({
							user_to: payload.userTo,
							user_from: payload.userFrom,
							status: 1
						});
						const row = await process.save();
						
						
							 _final3 = row;				 
					}
						  
						  catch(e){
						   
							_final3 =  'Bug'
						  }
						  if(_final3 == undefined || _final3 === 'Bug'){
							output = 'Error'
						}
						else{
							output = "Sended"
						}
				}else{
					output = "Sended"
				}
	  }else {
		output = "Sended"
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};





module.exports ={ acceptMessagingRequest, deleteMessagingRequest, sendMessagingRequest }



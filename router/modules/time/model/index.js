const con = require('../../../../database/index.js'); 
const _  = require('lodash');
const output = require('../../../../output/index.js');

  
 

  const feedback_get =  async({payload = {}} = {}) =>  {
   const access = _.forIn(payload);
  
try {
   con.query(`SELECT * FROM feedback  WHERE id = ${con.escape(access.payload._e)}`,  (err, result) => {
   if(err || result == undefined){
	 var _final = 'Error';
	  }
	  else if(result.length === 0){
         var _final = 'nothing';
	  }
	  else{
    var _final = result;
	}
	 output.response(_final);
	 
	  
	  
	  
	  });}
	  catch(e){
		output.response('Error');  
	  };
	  


return;

};

const feedback_update = async({payload = {}} = {}) =>  {
	const access = _.forIn(payload);
	
	try{
    con.query(`UPDATE feedback SET reply = '1' WHERE id = ${con.escape(access.payload)}`,  (err, result) => {
   if(err || result == undefined){
	 var _final = 'Error';
	  }
	  else if(result.length === 0){
         var _final = 'nothing';
	  }
	  else{
    var _final = 'Updated';
	}
	 
	output.response(_final);
	  
	  
	  
});
	}
	catch(e){
		output.response('Error');  
	  }



};

const feedback_set = async(payload) =>  {
	try {
    con.query(`INSERT INTO feedback(name , email, message, submitted_at) VALUE(${con.escape(payload._n)},${con.escape(payload._e)},${con.escape(payload._m)}, now())`,  (err, result) => {
   if(err || result == undefined){
	 var _final = 'Error';
	  }
	  else if(result.length === 0){
         var _final = 'nothing';
	  }
	  else{
    var _final = 'Sended';
	}
	 
	output.response(_final);
	  
	  
	  
});
	}
    catch(e){
		output.response('Error');  
	  }


};

module.exports ={ feedback_get, feedback_update, feedback_set }



const con = require('../../../../database/index.js'); 
const _  = require('lodash');
const _output = require('../../../../output/index.js');
const {
	Past,
	Present,
	Future,
	Subject
 } = require("../../models/index.js");
  
 

  async function past(payload){
  
    var _final = [];
    var  output = [];
	
try { 
	const process = Past.build({
		user_id: payload._m,
		name: payload._h,
		type : payload._g,
		file: "[]",
		file_type: "1",
		date_1st : payload.date_1st,
        date_2nd : payload.date_2nd,
		date_type : payload.date_type,
        location : payload.location,
        try : payload.try,
        how : payload.how,
        story : payload.story,
		b1: "0",
		b2 : "0",
		b3 : "0"	
	});
	const row = await process.save();
     _final = row;
	
 
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
		  output =  'Past created'
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};

const present = async(payload) =>  {
	
	const access = _.forIn(payload);
	
	 var _final = [];
    var  output = [];
	
try {
	const process = Present.build({
		user_id: payload._m,
		name: payload._h,
		type : payload._g,
		file: "[]",
		file_type: "1",
		date_1st : payload.date_1st,
        date_2nd : payload.date_2nd,
		date_type : payload.date_type,
        location : payload.location,
        try : payload.try,
        how : payload.how,
        story : payload.story,
		b1: "0",
		b2 : "0",
		b3 : "0"	
	});
	const row = await process.save();
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
		 output = 'Present created'
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};

const future = async(payload) =>  {

	const access = _.forIn(payload);
	
	 var _final = [];
    var  output = [];
	
try {
	const process = Future.build({
		user_id: payload._m,
		name: payload._h,
		type : payload._g,
		date_1st : payload.date_1st,
        date_2nd : payload.date_2nd,
		date_type : payload.date_type,
        location : payload.location,
        try : payload.try,
        file: "[]",
		file_type: "1",
		b1: "0",
		b2 : "0",
		b3 : "0"	
	});
	const row = await process.save();
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
		  output = 'Future created'
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};

const subject = async(payload) =>  {
	
	
	 var _final = [];
    var  output = [];
	
try {

	const process = Subject.build({
		user_id: payload._m,
		name: payload._h,
		meaning : payload._p,
		type : payload._g,
		file: "[]",
		file_type: "1"	
	});
	const row = await process.save();
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
		  output = 'Added'
	  }
 await _output.response(output);

  return {
	 
	 output
	  
	  };

};



module.exports ={ past, present ,future , subject }



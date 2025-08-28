const { profilepic } = require('../profilepic/update');
const { username } = require('../settings/user');
const Model = require('./model/index');
const  date = require('date-and-time');
const { upperCase } = require('lodash');

module.exports = {

async getLifelineSingle(req, res, next){
    var from = req.body.from;
    var addedQuery = '';
    if(upperCase(from) === "PAST"){
        addedQuery = `past.date_1st, past.date_2nd, past.date_type, past.location, past.how, past.try, past.story,`
    } else if(upperCase(from) === "PRESENT"){
        addedquery = `present.date_1st, present.date_2nd, present.date_type, present.location, present.how, present.try, present.story,`
    } else if(upperCase(from) === "FUTURE"){
        addedQuery = `future.date_1st, future.date_2nd, future.date_type, future.location, future.try,`
    }
var payload = {
//	_m : req.body.username,
	from : from,
    id : req.body.id,
	user_id : req.userData.userId,
	addedQuery : addedQuery
	
};


const r = await process(payload);
 res.json(r);
},

}
async function process(payload){
	const _model = await  Model.get(payload);
  
   const _access = _model.output;

   if(_access === 'Nothing' || _access  === 'Error' ){
	  var ac  = 'nothing';
   }else{
     var access = _access[0];
    var d = {
        id : access.id,
        user : {
            firstname : access.first_name,
            lastname : access.last_name,
            profilepic : access.profilepic,
            id :  access.user_id,
            username : access.username
        },
        active : {
            id : access.active_id,
            value : access.active
        },
        [payload.from] : {
             id : access.id,
             name : access.name,
             created_at : date.format(access.created_at, 'ddd, MMM DD YYYY'),
             b1 : access.b1,
             b2 : access.b2,
             b3 : access.b3,
             type : access.type,
             file :access.file,
             file_type : access.file_type,             
             date1st : access.date_1st,
                    date2nd : access.date_2nd,
                    dateType : access.date_type,
                    location : access.location,
                    how : access.how === undefined ? undefined : access.how,
                    try : access.try,
                    story : access.story === undefined ? undefined : access.story,
        },
       
        user_messaging_request_status : access.user_messaging_requests_status,
        messaging : messaging_status(access.messaging,  access.user_messaging_requests_status)
    }
    
        ac = d
            
        
       
   }
   
	 return ac;
  }
  function messaging_status(e, p){
    var t = ((e == 1 && p == 2)||(e == 0)) ? true : false;
    return t;
  }
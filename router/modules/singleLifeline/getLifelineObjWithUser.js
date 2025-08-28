
const Model = require('./model/index');
const  date = require('date-and-time');

module.exports = {

async process(p){
   
    var objType = p.objType == 1 ? 'past' : p.objType == 2 ? 'present' : p.objType == 3 ? 'future' : null;
    
    var addedQuery = '';
    if(objType === "past"){
        addedQuery = `past.date_1st AS date1st, past.date_2nd AS date2nd, past.date_type AS dateType, past.location, past.how as how, past.try as try, past.story as story,`
    } else if(objType === "present"){
        addedquery = `present.date_1st AS date1st, present.date_2nd AS date2nd, present.date_type AS dateType, present.location, present.how as how, present.try as try, present.storyas story,`
    } else if(objType === "future"){
        addedQuery = `future.date_1st AS date1st, future.date_2nd AS date2nd, future.date_type AS dateType, future.location, future.try as try,`
    }
var payload = {
//	_m : req.body.username,
objId : p.objId,
obj : objType,
user1 : p.user1,
user2 : p.user2,
addedQuery : addedQuery	
	
};
const r = await Model.getLifelineObjWithUser(payload);
 let y = r.output;
  y.objType = p.objType;
 return y;
},
}
 
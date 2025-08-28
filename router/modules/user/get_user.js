const Model = require('./model/index');

module.exports = {

async you (req, res){
	const payload  = {
		username : req.body.username,
		user_id : req.userData.userId
	};
	const r = await process(payload);
 res.json(r);
},
async process(d){return process(d)}


}
async function process(payload){
	const _model = await  Model.user(payload);
   const access = _model.output;

   if(access === 'Nothing' ){
	  _user ='nothing'  
   }
    else if(access === 'Error' || access === 'Bug' ){
	  _user ='Error'  
   }
   else{
	   var personData = access._final_p[0];
	      
	if(personData.id === null){
		_re = {accept_at: "0", id: 0, notification_seen: 0, notification_status: "0", propose_at: "0", relation_status: "0", relation_value: 0, status: "0", user_1: "0", user_2: "0", }; 
	   }else{
		  _re = {accept_at: personData.accept_at, id: personData.id, notification_seen: personData.notification_seen, notification_status: personData.notification_status, propose_at: personData.propose_at, relation_status: personData.relation_status, relation_value: personData.relation_value, status: personData.status, user_1: personData.user_1, user_2: personData.user_2, }; 
	   }
 _user = ({
				first_name  : personData.first_name,
				last_name :  personData.last_name,
				user_id:  personData.user_id,
				profilepic :  personData.profilepic,
				online :  personData.online,
				online_at :   personData.online_at,
				privacy :  personData.privacy,
             	address:  personData.address,
                date: personData.date,
                month :  personData.month,
                year :  personData.year,
				role : personData.role,
                relation : _re,
                username : personData.username,
                email : personData.email,
                phone : personData.phone 				
				});
   }
	 return _user;
  }
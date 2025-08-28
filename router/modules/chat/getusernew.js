const Model = require('./model/index');
module.exports = {

async chat_user_get_new (req, res, next){	
 const ob  = [];
 const payload = {
	
    id : req.body.id
    
    
 };
 const r = await process(payload);
 res.json(r);
},
async process(d){return process(d)}
}
async function process(payload){
   const _model = await  Model._getusernew(payload);
   const access = _model.output;
   var response  = [];
    if(access === 'Nothing'){
       response = 'Nothing'
    }else if(access === 'Error'){
       response = 'Error'
    }else{
      response = access; 
    }
	 return response;
  }
const { signature } = require("../../../service/encode");
const { otp } = require("../../../service/otp");
const { checkEmail } = require("./model");
const RedisPasswordRecovery = require('../../../redisClass/passwordRecoveryCredentials');
const { mailingEmitter } = require("../../../mailingEvent");

exports.checkEmail = async(req, res) => {
  const email = req.body.email;
   const  {output} =  await checkEmail(email);
   if(output === "Error") {res.json({data : "Error", message : "Database error.", status : false, action : 0});
  return;
  }
   if(output !== true){res.json({data : {}, message : "No account found.", status : false, action : 0});
  return;
  }
    let _otp = await otp();
    let key = await signature(email);
     
    let exists = await RedisPasswordRecovery.get(key);
 if(exists !== null){

   return res.json({
      data : {key : key},
       message : "This email is already link for password update  try again 24hr.",
      status : true,
      action : 0
   })



 }
    


    let result = await RedisPasswordRecovery.put(key, _otp, email);
    if(result === true){
        
    //mailing event
   mailingEmitter.emit("mailing", {
      content : {
         to : email,
         subject : "OTP for account recovery.",
         type : 'recovery',
         otp :  _otp
        
      },
      priority : 10,
      otp :  _otp
   });




         res.json({data : {key : key}, message : "A otp sent on your registered email.", status : true, action : 1});
    }else{
       res.json({data : {}, message : "Error in updating otp.", status : false, action : 0});
    }

   
}








// {
//     "data": {
//         "key": "6L3SAHBH8KGFOFGDGEAQZQE4POA-MMPRX-VB-QEA_-Q"
//     },
//     "message": "A otp sent on your registered email.",
//     "status": true,
//     "otp": "CGTOQCHN"
// }
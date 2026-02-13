const { signature, dsignature } = require("../../../service/encode");
const { otp } = require("../../../service/otp");
const { checkEmail } = require("./model");
const RedisPasswordRecovery = require('../../../redisClass/passwordRecoveryCredentials');
const { mailingEmitter } = require("../../../mailingEvent");

exports.requestEmail = async(req, res) => {
  const key = req.body.key;
     let _otp = await otp();
   let exists = JSON.parse(await RedisPasswordRecovery.get(key));
   
   let email = null;
   if(exists == null){
      return res.json({data : {}, 
         message : "Try again from starting.", 
          status : false,
          action : -100
         });
   }  email = exists.email;
   
   
    if(exists !==null && (exists.emailingTime > 2 ||  exists.otpTryTime >= 3)){
      return res.json({data : {tryTime : exists.emailingTime + 1}, 
         message : "Try again after 24hr max request hit.", 
          status : false,
          action : -100
         });
    }
    let result = await RedisPasswordRecovery.put(key, _otp, email, exists.otpTryTime, exists.emailingTime + 1);
    if(result === true){
        
    //mailing event
   mailingEmitter.emit("mailing", {
      content : {
         to : exists.email,
         subject : "OTP for account recovery.",
         type : 'recovery',
         otp :  _otp
        
      },
      priority : 10,
      otp :  _otp
   });

         res.json({data : {tryTime : exists.emailingTime + 1}, message : "A otp sent on your registered email.", status : true, action : 1});
    }else{
       res.json({data : {tryTime : 0}, message : "Error in updating otp.", status : false, action : 0});
    }

   
}
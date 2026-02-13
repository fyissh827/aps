const { signature, dsignature } = require("../../../service/encode");
const { otp } = require("../../../service/otp");
const { checkEmail } = require("./model");
const RedisSignin = require('../../../redisClass/signupCredentials');
const { mailingEmitter } = require("../../../mailingEvent");

exports.requestEmailVerification = async(req, res) => {
  const key = req.body.key;
     let _otp = await otp();
   let exists = JSON.parse(await RedisSignin.get(key));
      console.log(exists);
   let email = null;
   if(exists == null){
      return res.json({data : {}, 
         message : "Try again from starting.", 
          status : false,
          action : -100
         });
   }  email = JSON.parse(exists?.document)?.email;
   
    if(exists !== null && (exists.emailingTime > 2 || exists.otpTryTime >= 3)){
      return res.json({data : {tryTime : exists.emailingTime + 1}, 
         message : "Try again after 24hr max request hit.", 
          status : false,
          action : -100
         });
    }
    let result = await RedisSignin.put(key, _otp, JSON.stringify(exists.document), exists.otpTryTime, exists.emailingTime + 1);
    console.log(result);
    if(result === true){
        
    //mailing event
   mailingEmitter.emit("mailing", {
      content : {
         to : JSON.parse(exists?.document)?.email,
         subject : "OTP for email verification.",
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
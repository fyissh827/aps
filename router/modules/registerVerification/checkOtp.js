const RedisSignin = require("../../../redisClass/signupCredentials");
const Model = require("../registration/model/index.js");
const jwt = require('jsonwebtoken');
const { setReturnData } = require('../../../managers/hashing');
const { refreshToken } = require('../../../managers/refreshToken.js');
exports.checkOtpRegisterVerification = async (req, res) => {
  const { key, otp, clientSystem } = req.body;

  const result = await RedisSignin.checkOtp(key, otp);

  if (typeof(result) == 'number') {
    if(result == 2){
       return res.json({
      data: {},
      message: "Your no of trial is over try after 24 hr.",
      status: false,
      action : -100
    });
    }else if(result === 0){
       return res.json({
      data: {},
      message: "Try again from starting.",
      status: false,
      action : -100
    });
    }else{

      return res.json({
      data: {},
      message: "OTP is not correct.",
      status: false,
      action : 0
    });
    }
   
  }else{
     let t1 = JSON.parse(result);
   
           (a = (await Model.signup(t1)).output);
         if ("Error" == a || 'Nothing' === a)
         return  res.json({
         otpVerificationAction : false,
             action : 0,
             true_msg: !1,
             msg: a,
             type: 'Registration',
           });
         else {
           delete t1.password;
           delete t1.year;
           delete t1.month;
           delete t1.date;
           delete t1.verified;
           delete t1.origin;
             (t1.username = a.username),
             (t1.id = a.id),
             (phone = null),
             (t1.profilepic = '1.svg'),
             (t1.status = 0);

             const isProduction = process.env.NODE_ENV === "production";
             let rt = await refreshToken(t1.id ,t1.email, clientSystem);
             res.cookie("_srf", rt, {
               httpOnly: true,
               secure: isProduction,                 // true only on HTTPS production
               sameSite: isProduction ? "none" : "lax",
               path: "/",
               maxAge: 60 * 24 * 60 * 60 * 1000
             });
              return res.json({
               action : 1,
                 true_msg: !0,
                 msg: 'login',
                 type: 'Registration',                 
                 access: setReturnData(t1, a, "Self"),
               })
             
         }






  }

  
  
};



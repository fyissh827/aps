const con = require('../../../database/index.js'),
  bcrypt = require('bcrypt'),
  Joi = require('joi'),
  path = require('path'),
  Model = require('./model/index'),
  jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
const { registerUser: registerUser } = require('../../../redis/');
const { doesNotReject } = require('assert');
const { setReturnData } = require('../../../managers/hashing');
const { date } = require('joi');
const { signature } = require('../../../service/encode.js');
const RedisSignin  = require("../../../redisClass/signupCredentials.js");
const { otp } = require('../../../service/otp.js');
const { mailingEmitter } = require('../../../mailingEvent/index.js');
const { refreshToken } = require('../../../managers/refreshToken.js');
 require('dotenv').config();
module.exports = {
  async signup(e, r) {

    //check validation 
    if ('Self' === e.query.request) {
      let o = Joi.object({
        password: Joi.string()
          .min(8)
          .max(20)
          .pattern(new RegExp('[A-Z0-9@$%&]')),
        first_name: Joi.string().min(2).max(15).required(),
        last_name: Joi.string().min(2).max(15).required(),
        email: Joi.string().email({
          minDomainSegments: 2,
          tlds: {
            allow: ['com', 'net', 'in'],
          },
        }),
        year: Joi.number().integer().min(1950).max(2009).required(),
        month: Joi.number().required(),
        date: Joi.number().required(),
        origin: Joi.number().required(),
        verified: Joi.number().required(),
        clientSystem:Joi.string().required(),
      }).validate(e.body);
      if (o.error) {
        var i = o.error.details[0].message;
        return void r.json({
          otpVerificationAction : false,
          msg: i,
        });
      }
    }

    const o = {
        password: e.body.password,
        first_name: e.body.first_name,
        last_name: e.body.last_name,
        email: e.body.email,
        year: e.body.year,
        month: e.body.month,
        date: e.body.date,
      };


   //check in redis
    let key  = await signature(e.body.email);
    let checkRedisData = await RedisSignin.get(key);
   if(checkRedisData !== null){
     return r.json({
      otpVerificationAction : false,
      action : 0,
        msg: 'This email is in process for verification try after 24 hr.',
     })
   };
   //check in redis end here


        // check id data exists
     const t = (await Model.login(o)).output;
    
      // if user +googleauth + data exist
    if ('Nothing' !== t && 'Self' !== e.query.request) {
      

      ///   make apii  for refresh token nowwwwwww.
      

      
let rt = await refreshToken(t[0].id ,t[0].email, e.body.clientSystem);
console.log('first', (process.env.NODE_ENV === "production"));
         ///first here 2 max
const isProduction = process.env.NODE_ENV === "production";
// delete access[0].password;
// delete access[0].email;
r.cookie("_srf", rt, {
  httpOnly: true,
  secure: isProduction,                 // true only on HTTPS production
  sameSite: isProduction ? "none" : "lax",
  path: "/",
  maxAge: 60 * 24 * 60 * 60 * 1000
});
      r.json({
        otpVerificationAction : false,
        action : 1,
        msg: 'login',
        type: 'login',
        access: setReturnData(o, t, e.query.request),
      });
    } 
       // if user -googleauth + data exist
    else if (
      (t !== 'Nothing' || t === 'Error') &&
      'Self' === e.query.request
    ) {
      r.json({
        otpVerificationAction : false,
        action : 0,
        msg: 'This email is already in use!',
      });
    } 
    
    //  data creation
    else {


      // encrypt password if -googleAuth if + googleAuth blank password
      // encrypt password if googleauth blank if self encryped ''
      p = 'Self' === e.query.request ? doesNotReject() : '';
      function doesNotReject() {
        var i = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(o.password, i);
      }
      /////
      console.log(p);
        // this final data for login
      (t1 = {
        password: p,
        first_name: e.body.first_name,
        last_name: e.body.last_name,
        email: e.body.email,
        year: e.body.year,
        month: e.body.month,
        date: e.body.date,
        origin: e.body.origin,
        verified: e.body.verified,
      });
       
       //put in redis and for verification process;
      if('Self' === e.query.request){
       let  _otp =  await otp();
       console.log(_otp);
       let insertResult  = await RedisSignin.put(key, _otp, JSON.stringify(t1));
      if(insertResult === true){ 

        //mailing here   
          mailingEmitter.emit("mailing", {
        content : {
         to : t1.email,
         subject : "OTP for email verification.",
         type : 'signup',
         otp :  _otp
        
        },
        priority : 11,
        otp :  _otp
       });   
        return r.json({
          otpVerificationAction : true,
          key : key,
      action : 1,
        msg: 'Otp is sended to your registered email.',
     })
      }else{
        return r.json({
          otpVerificationAction : false,
      action : 0,
        msg: 'Verification generation error.',
     })
      }



        

       }else{
        

        (a = (await Model.signup(t1)).output);
        if ('Nothing' === a)
        r.json({
      otpVerificationAction : false,
          action : 0,
          true_msg: !1,
          msg: a,
          type: 'Registration',
        });
      else {
        delete o.password;
        delete o.year;
        delete o.month;
        delete o.date,
          (o.username = a.username),
          (o.id = a.id),
          (phone = null),
          (o.profilepic = '1.svg'),
          (o.status = 0);


          // first here 
const isProduction = process.env.NODE_ENV === "production";
// delete access[0].password;
// delete access[0].email;
let rt = await refreshToken(t[0].id ,t[0].email, e.body.clientSystem);
r.cookie("_srf", rt, {
  httpOnly: true,
  secure: isProduction,                 // true only on HTTPS production
  sameSite: isProduction ? "none" : "lax",
  path: "/",
  maxAge: 60 * 24 * 60 * 60 * 1000
});
           r.json({
            otpVerificationAction : false,
            action : 1,
              true_msg: !0,
              msg: 'login',
              type: 'Registration',
              access: setReturnData(t1, a, e.query.request),
            })
          
      }



       }
          //singup 
     


      //   do here all things 
    }
  },
};

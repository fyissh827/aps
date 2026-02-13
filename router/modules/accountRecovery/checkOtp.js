const RedisPasswordRecovery = require("../../../redisClass/passwordRecoveryCredentials");

exports.checkOtp = async (req, res) => {
  const { key, otp } = req.body;

  const result = await RedisPasswordRecovery.checkOtp(key, otp);

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
   
  }

  
  return res.json({
    data : {
      token : result
    },
    message: "Please set new password within 10 minutes.",
    status: true,
     action : 1
  });
};

// res.cookie("passwordRecoveryID", result, {
  //   httpOnly: true,
  //    secure: true,      
  //   sameSite: "none",   
  //   maxAge: 10 * 60 * 1000
  // });

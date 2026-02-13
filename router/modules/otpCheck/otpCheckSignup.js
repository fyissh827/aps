const redisSignin = require('../../../redisClass/signupCredentials');
exports.otpCheckSignup = async(req, res) => {
      const {key, otp} = req.body;
         const document = await  redisSignin.checkOtp(key, otp);
         res.json(document);

}
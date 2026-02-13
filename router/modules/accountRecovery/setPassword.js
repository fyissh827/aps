const { jwtUtils } = require("../../../service/jwt");
const { setPassword } = require("./model");
const bcrypt = require('bcrypt');
exports.setPassword = async(req, res) => {
let token = req.cookies._tKeyAr ?? null;
const {password} = req.body;


//joi check;



if(token === null)
{
res.json({data : {}, message : "Token error.", status : false, action : -100});
return;
}
let payload = await jwtUtils(5).decodeJWT(token);
if(payload == null) {
     res.json({data : {}, message : "Token expired, Try later.", status : false, action : -100});
 return;
}
 let i = bcrypt.genSaltSync(10);
 let hashedPassword = bcrypt.hashSync(password, i);
const  {output} =  await setPassword({email : payload.email, hashedPassword : hashedPassword});
if(output){
     res.json({data : {}, message : "Your password is updated.", status : true, action : 1});
}else{
     res.json({data : {}, message : "Error try later.", status : false, action : 0});
}
}
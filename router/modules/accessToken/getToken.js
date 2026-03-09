const jwt = require('jsonwebtoken');
const redisToken = require('../../../redisClass/redisToken');
const { decode } = require('../../../service/encodeForToken');
exports.acessToken = async(req, res) => {
let clientSystem = req.body.clientSystem;
let cookie = req.cookies._srf;
if(cookie == null){
    return res.status(401).json({
        message : "You are not authorised please login.",
        status : 401,
        token : null,
    })
}else{
const decodedToken = jwt.decode(cookie);
if(decodedToken == null){
    return res.status(401).json({
        message : "You are not authorised please login.",
        status : 401,
        token : null,
    })
}else{
 let tokenId = decodedToken.tokenID;
 if(!tokenId){
    return res.status(401).json({
        message : "You are not authorised please login.",
        status : 401,
        token : null,
    })
 }else{
   //get redis data;
  let data = await redisToken.get(tokenId);
   if(!data || data !== clientSystem){
       return res.status(401).json({
        message : "Your system is different from actual system where token is authorised.",
        status : 401,
        token : null,
    })
   }else{
   let userData = JSON.parse(await decode(tokenId));
   const token = jwt.sign(
             {
               email: userData.email,
               userId: userData.id,
             },
             process.env.JWTKEY,
             {
                expiresIn: '15min'
             }
           );
    return res.status(200).json({
        message : "You are accessed now.",
        status : 200,
        token : token,
    })

   }




 }

}
 



}

}
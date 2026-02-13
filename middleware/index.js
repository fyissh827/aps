const jwt = require('jsonwebtoken');
 require('dotenv').config();
module.exports = {
  isLoggedIn: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWTKEY);
      req.userData = decoded;
      next();
    } catch (err) {
      console.log(err);
      return res.status(401).json({
        msg: 'Your session is not valid!',
      });
    }
  },
  isLoggedInGraphql: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if(!token){
      req.userData = {};      
      next();
      }else{
        const decoded = jwt.verify(token, process.env.JWTKEY);
      req.userData = decoded;      
      next();
      }
      
    } catch (err) {
      console.log("err : ", err);
      res.status(401).send({
        msg : "token is expired."
      })
    }
  },
};

const con = require('../../../database/index.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Model = require('./model/index');
const { refreshToken } = require('../../../managers/refreshToken.js');
 require('dotenv').config();

module.exports = {
  async login(req, res) {
    
    const payload = {
      email: req.body.email,
      password: req.body.password,
    };
    const _model = await Model.login(payload);
    const access = _model.output;
    console.log(access);
    const hash = access[0].password;
    if (access === 'Nothing') {
      res.json({
        password_msg: false,
        email_msg: true,
        token: '',
        user: '',
        true_msg: false,
      });
    } else {
      const result = bcrypt.compareSync(payload.password, hash);
      if (result === true) {
        // const token = jwt.sign(
        //   {
        //     email: access[0].email,
        //     userId: access[0].id,
        //   },
        //   process.env.JWTKEY,
        //   {
        //      expiresIn: '15min'
        //   }
        // );
   
   let rt = await refreshToken(access[0].id ,access[0].email, req.body.clientSystem);
   if(rt === null){
    return res.json({
          password_msg: false,
          email_msg: false,
          token: '',
          user: '',
          true_msg: false,
          access: {},
        });
   }
 res.cookie("_srf", rt, {
    httpOnly: true,    
    secure: false,      
    sameSite: "lax",    
    path: "/",  
    maxAge: 60 * 24 * 60 * 60 * 1000, 
  });

        res.json({
          password_msg: false,
          email_msg: false,
          true_msg: true,
          user: access[0].id,
          access: access,
        });
      } else {
        res.json({
          password_msg: true,
          email_msg: false,
          token: '',
          user: '',
          true_msg: false,
          access: {},
        });
      }
    }
    return;
  },
};

const Model = require('./model/index');
module.exports = {

async chat_count(req, res, next){	
const payload = {
    user1 : req.userData.userId
 };
const _model = await  Model._get_count(payload);
  const access = _model.output;
   res.json(access);


}
}
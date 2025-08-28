const Model = require('./model/index_alpha');
module.exports = {

async present_delete(req, res){
const payload = {
 id : req.body.id,
  };
const _model = await  Model.present_delete(payload);
    res.json(_model.output);

 }
}
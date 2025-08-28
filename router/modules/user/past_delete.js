const Model = require('./model/index_alpha');
module.exports = {

async past_delete(req, res){
const payload = {
 id : req.body.id,
 type : req.body.type
  };
const _model = await  Model.past_delete(payload);
    res.json(_model.output);

 }
}
const con = require('../../../database/index.js'); 
const Model = require('./model/index')
module.exports = {

async feedback(req, res){
var payload = req.body.id;


 const _model =  await Model.feedback_update({payload:{payload}});
   res.json(_model.output);
 
}


}
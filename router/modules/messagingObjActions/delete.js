const Model = require('./model/index');
module.exports = {

async messagingRequestDelete (req, res){
const payload = {
	dataId : req.body.dataId,
    msgId : req.body.msgId
	
};
const _model = await  Model.deleteMessagingRequest(payload);
res.json(_model.output);
}
}
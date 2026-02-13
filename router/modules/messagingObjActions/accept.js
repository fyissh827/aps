const Model = require('./model/index');
module.exports = {
  async messagingRequestAccept(req, res) {
    const payload = {
      id: req.body.dataId,
    };
    const _model = await Model.acceptMessagingRequest(payload);
    res.json(_model.output);
  },
};

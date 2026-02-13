const Model = require('./model/index');
module.exports = {
  async messagingRequestSend(req, res) {
    const payload = {
      userTo: req.body.userTo,
      userFrom: req.userData.userId,
    };
    const _model = await Model.sendMessagingRequest(payload);
    res.json(_model.output);
  },
};

const Model = require('./model/index_alpha');
module.exports = {
  async present_delete(req, res) {
    const payload = {
      user_id : req.userData.userId,
      id: req.body.id,
      type : 'present'
    };
    const _model = await Model.past_delete(payload);
    res.json(_model.output);
  },
};

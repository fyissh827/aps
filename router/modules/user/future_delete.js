const Model = require('./model/index_alpha');
module.exports = {
  async future_delete(req, res) {
    const payload = {
     user_id : req.userData.userId,
      id: req.body.id,
      type : 'future'
    };
    const _model = await Model.past_delete(payload);
    res.json(_model.output);
  },
};

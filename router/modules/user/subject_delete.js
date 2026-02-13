const Model = require('./model/index_alpha');
module.exports = {
  subject_delete: async (req, res, next) => {
    const payload = {
         user_id : req.userData.userId,
         id: req.body.id
       };
       const _model = await Model.subject_delete(payload);
       res.json(_model.output);
  },
};

const Model = require('./model/index');
module.exports = {
  _delete: async(req, res) => {
    var user_id = req.userData.userId;
    const _model = await Model.user_delete(user_id);    
        res.json(_model.output);   
    
  },
};

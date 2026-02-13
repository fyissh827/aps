const Model = require('./model/index');
const { updateUserSingle } = require('../../../redis/index.js');

module.exports = {
  async remove(req, res) {
    const payload = {
      _m: req.userData.userId,
    };
    const _model = await Model.deleted(payload);

    if (_model.output === 'Removed') {
      
      var result = { msg: _model.output, file: '1.svg' };
      
    } else if (_model.output !== 'Removed' || value !== 'OK') {
      result = { msg: 'Error' };
    }

    res.json(result);
  },
};

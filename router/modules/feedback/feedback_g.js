const con = require('../../../database/index.js');
const Model = require('./model/index');
const _ = require('lodash');
module.exports = {
  async feedback(req, res) {
    const payload = {
      _o: req.body.length,
      _l: 4,
    };

    const _model = await Model.feedback_get({ payload: { payload } });

    res.json(_model.output);
  },
};

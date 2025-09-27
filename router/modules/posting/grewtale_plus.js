const Model = require('./model/index');

module.exports = {
  async grewtaleplus(req, res) {
    const payload = {
      user_id: req.body.userId,
      primitive_id: req.body.primitive_id,
      accelerator: req.body.accelerator,
      wn: req.body.wn,
      title: req.body.title,
      content: req.body.content,
      standard: req.body.standard,
      privacy: req.body.privacy,
    };
    console.log(req.body);
    const _model = await Model._insert_2(payload);

    if (
      _model.output === 'Error' ||
      _model.output === 'Nothing' ||
      _model.output === 'Bug'
    ) {
      var output1 = {
        msg: 'Error',
        id: 0,
      };
      res.json(output1);
    } else {
      const payload_2 = {
        id: _model.output.dataValues.id,
        obj: req.body.obj,
        file_type: req.body.file_type,
        webMeta: req.body.webMeta,
      };

      const _model2 = await Model._insert_file(payload_2);
      var output = {
        msg: _model2.output,
        id: _model.output.insertId,
      };
      res.json(output);
    }
  },
};

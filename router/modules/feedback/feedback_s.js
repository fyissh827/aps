const con = require('../../../database/index.js');
const Model = require('./model/index');
const nodemailer = require('nodemailer');

module.exports = {
  async feedback(req, res) {
    const payload = {
      _e: req.body.email,
      _n: req.body.name,
      _m: req.body.message,
    };

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'fyisshinformation@gmail.com',
        pass: 'qqzzwx@1',
      },
    });

    var mailOptions = {
      from: 'fyisshinformation@gmail.com',
      to: 'hr.09351@gmail.com',
      subject: 'Fyissh Web - Product Feedback ',
      text: 'That was easy!',
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.json(error);
        console.log(error);
      } else {
        res.json('Sended');
      }
    });

    //const _model = await Model.feedback_set({payload:{payload}});
    // res.json(_model.output);
  },
};

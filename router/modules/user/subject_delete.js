const con = require('../../../database/index.js');
module.exports = {
  subject_delete: (req, res, next) => {
    const id = req.body.id;

    let sql = `DELTE FROM subject WHERE id = ${con.escape(id)}`;
    con.query(sql, function (err, data, fields) {
      if (err) {
        res.json('Error');
      } else {
        res.json('Deleted');
      }
    });

    return;
  },
};

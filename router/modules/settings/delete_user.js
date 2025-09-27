const con = require('../../../database/index.js');
module.exports = {
  _delete: (req, res) => {
    var _m = req.userData.userId;

    let _sql1 = `DELETE FROM users WHERE id = ${con.escape(_m)}`;
    con.query(_sql1, (err, result) => {
      if (err) {
        res.json('Error');
      } else {
        let _sql2 = `DELETE FROM Settings WHERE user_id = ${con.escape(_m)}`;
        con.query(_sql2, (err, result) => {
          if (err) {
            res.json('Error');
          } else {
            res.json('Deleted');
          }
        });
      }
    });
    return;
  },
};

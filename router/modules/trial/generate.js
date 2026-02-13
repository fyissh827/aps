const con = require('../../../database/index.js');
const generateUniqueId = require('generate-unique-id');

module.exports = {
  generate: (req, res) => {
    var user_id1 = req.userData.userId;
    var user_id2 = req.body.id;
    var id = generateUniqueId({
      length: 10,
      useLetters: true,
    });
    let pre_sql = `SELECT id, user_id1 FROM private_chat_id WHERE  user_id1 = ${con.escape(user_id1)} AND user_id2 = ${con.escape(user_id2)} OR user_id1 = ${con.escape(user_id2)} AND user_id2 = ${con.escape(user_id1)}`;
    con.query(pre_sql, function (err, result1, field) {
      if (result1.length === 0) {
        let sql = `INSERT INTO private_chat_id(chat_id, user_id1, user_id2 , propose_at) VALUES (
${con.escape(id)}, ${con.escape(user_id1)}, ${con.escape(user_id2)},  now())`;
        con.query(sql, function (err, result, field) {
          if (err) throw err;
          {
            let sql2 = `SELECT private_chat_id.id, private_chat_id.status_1, users.username, users.first_name, users.last_name, users.profilepic, users.online, users.online_at FROM users INNER JOIN  private_chat_id ON  private_chat_id.user_id2  = users.id  WHERE user_id2 = ${con.escape(user_id2)} `;
            con.query(sql2, function (err, data, field) {
              if (err) throw err;
              {
                res.json(data);
              }
            });
          }
        });
      } else {
        if (result1[0].user_id1 == user_id1) {
          let sql2 = `SELECT private_chat_id.id, private_chat_id.chat_id, private_chat_id.status_1, users.username, users.first_name, users.last_name, users.profilepic, users.online, users.online_at FROM users INNER JOIN  private_chat_id ON  private_chat_id.user_id2  = users.id  WHERE user_id2 = ${con.escape(user_id2)} `;
          con.query(sql2, function (err, data, field) {
            if (err) throw err;
            {
              res.json(data);
            }
          });
        } else {
          let sql2 = `SELECT private_chat_id.id, private_chat_id.chat_id, private_chat_id.status_1, users.username, users.first_name, users.last_name, users.profilepic, users.online, users.online_at FROM users INNER JOIN  private_chat_id ON  private_chat_id.user_id1  = users.id  WHERE user_id1 = ${con.escape(user_id2)} `;
          con.query(sql2, function (err, data, field) {
            if (err) throw err;
            {
              res.json(data);
            }
          });
        }
      }
    });

    return;
  },
};

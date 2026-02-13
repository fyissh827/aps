const con = require('../../../../database/index.js');
const checkEmail = async (email) => {
  var _final = [];
  var output = [];
  try {
    const [row, fields] = await con.execute(
      `SELECT * FROM users WHERE email = '${email}' AND u_status = '0'`
    );
    _final = row;
  } catch (err) {
    console.log(err);
    _final = 'Bug';
  }

  if (_final == undefined) {
    output = 'Error';
  } else if (_final.length === 0) {
    output = false;
  } else {
    output = true;
  }
  return {
    output,
  };
};
const setPassword = async (payload) => {
  var _final = [];
  var output = [];
  try {
    console.log(payload);
  const [row, fields] = await con.execute(
  `UPDATE users   SET password = ? WHERE email = ?`,  [(payload.hashedPassword ?? "null"), (payload.email ?? "null")]
);
    _final = row;
    console.log(row);
  } catch (err) {
    console.log(err);
    _final = 'Bug';
  }

  if (_final == undefined) {
    output = 'Error';
  } else if (_final.affectedRows === 0) {
    output = false;
  } else {
    output = true;
  }
  return {
    output,
  };
};
module.exports = {checkEmail, setPassword};


//$2b$10$zOLqWYyOUUir7VW6VoWyI.DvVsAVysRTMPlh6h6dfH95mu0t1Hkty
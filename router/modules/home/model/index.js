const con = require('../../../../database/index.js');
const _ = require('lodash');
const _output = require('../../../../output/index.js');

async function suggestion(payload) {
  var _final = [];
  var output = [];
  var p = `AND id > ${payload.id}`;
  if (payload.next !== null) p = `AND id > ${payload.next}`;
  try {
    const [row, err] = await con.query(
      `SELECT id ,first_name ,last_name, profilepic, username FROM users  WHERE NOT id = '${payload.user_id}' ${p} AND u_status = '0' AND NOT EXISTS (SELECT * FROM connectors WHERE users.id = connectors.user_2  AND connectors.user_1 = '${payload.user_id}' OR users.id = connectors.user_1 AND connectors.user_2 = '${payload.user_id}' ) ORDER BY id ASC LIMIT ${payload.length}`
    );
    _final = row;
  } catch (e) {
    _final = e;
  }
  if (_final == undefined) {
    output = 'Error';
  } else if (_final.length === 0) {
    output = 'Nothing';
  } else {
    output = _final;
  }
  await _output.response(output);

  return {
    output,
  };
}

const feedback_update = async ({ payload = {} } = {}) => {
  const access = _.forIn(payload);

  var _final = [];
  var output = [];

  try {
    _final = await (
      await con()
    ).query(`UPDATE feedback SET reply = '1' WHERE id = ${access.payload}`);
  } catch (e) {
    _final = 'Bug';
  }
  if (_final == undefined) {
    output = 'Error';
  } else if (_final.length === 0) {
    output = 'Nothing';
  } else {
    output = 'Updated';
  }
  await _output.response(output);

  return {
    output,
  };
};

const feedback_set = async ({ payload = {} } = {}) => {
  const access = _.forIn(payload);
  console.log(access.payload._m);
  var _final = [];
  var output = [];

  try {
    _final = await (
      await con()
    ).query(
      `INSERT INTO feedback(name , email, message, submitted_at) VALUE('${access.payload._n}', '${access.payload._e}', '${access.payload._m}', now())`
    );
  } catch (e) {
    _final = 'Bug';
  }
  if (_final == undefined) {
    output = 'Error';
  } else if (_final.length === 0) {
    output = 'Nothing';
  } else {
    output = 'Sended';
  }
  await _output.response(output);

  return {
    output,
  };
};

module.exports = { suggestion, feedback_update, feedback_set };

const con = require('../../../../database/index.js');
const _ = require('lodash');
const _output = require('../../../../output/index.js');
const { Notification } = require('../../models/index.js');

async function _insert(payload) {
  var _final = [];
  var output = [];

  try {
    var process = Notification.build({
      user_id: payload.user_id,
      message: payload.message,
      type: payload.type,
      data_id: payload.data_id,
      external: payload.external,
      status: '0',
    });
    var row = await process.save();

    _final = row;
  } catch (e) {
    _final = 'Bug';
  }
  if (_final == undefined || _final === 'Bug') {
    output = 'Error';
  } else if (_final.length === 0) {
    output = 'Nothing';
  } else {
    output = 'OK';
  }
  await _output.response(output);

  return {
    output,
  };
}
async function _alertCountSet(payload) {
  var _final = [];
  var output = [];

  try {
    const [row, fields] = await con.query(
      `UPDATE users SET alertSeen = ${payload.seen}  WHERE id = ${payload.id}`
    );
    _final = row;
  } catch (e) {
    _final = 'Bug';
  }
  if (_final == undefined || _final === 'Bug') {
    output = 'Error';
  } else if (_final.length === 0) {
    output = 'Nothing';
  } else {
    output = 'OK';
  }
  await _output.response(output);

  return {
    output,
  };
}

async function get(payload) {
  var _final = [];
  var output = [];

  //SELECT users.id FROM users, connectors WHERE (connectors.user_1 =  users.id AND connectors.user_2 = '${payload.id}' OR connectors.user_2 =  users.id AND connectors.user_1 = '${payload.id}') AND connectors.relation_status = '2' AND connectors.status = '1' AND users.u_status = '0'
  //`SELECT users.id, users.first_name, users.last_name, users.profilepic, notification.id, notification.message, notification.data_id, notification.type, connectors.id AS yyyyyyyyyyyyyyyyy FROM users, connectors, notification WHERE users.id = notification.user_id AND EXISTS (SELECT * FROM connectors WHERE users.id = connectors.user_2  AND connectors.user_1 = '${payload.user_id}' OR users.id = connectors.user_1 AND connectors.user_2 = '${payload.user_id}' )`
  //SELECT CASE WHEN user_1 = '${payload.id}' THEN user_2 ELSE user_1 END AS id  FROM connectors WHERE (user_1 = '${payload.id}' OR user_2 = '${payload.id}')
  console.log(payload);
  var p = '';
  if (payload.next !== null) p = `AND notification.id < ${payload.next}`;
  try {
    const [row, fields] = await con.query(
      `SELECT connectors.id AS connectors_id, connectors.relation_value, users.id AS user_id, users.first_name, users.last_name, users.username, users.profilepic, notification.id, notification.message, notification.data_id, notification.type, notification.created_at, connectors.accept_at FROM users, connectors,  notification WHERE users.id = notification.user_id  AND ((users.id = connectors.user_1 AND connectors.user_2 = '${payload.id}') OR (users.id = connectors.user_2 AND connectors.user_1 = '${payload.id}')) AND connectors.relation_status = '2' AND connectors.accept_at < notification.created_at AND users.u_status = '0' ${p} ORDER BY notification.id DESC LIMIT  ${payload.length}`
    );
    _final = row;
    console.log(row);
  } catch (e) {
    _final = e;
  }
  if (_final == undefined || _final === 'Bug') {
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

async function _insert_file(payload_2) {
  //console.log(payload_2);
  var _final = [];
  var output = [];

  try {
    const [row, fields] = await con.query(
      `INSERT INTO grewtales_file (type, parent, file, file_type, created_at ) VALUES ('0', '${payload_2.id}', '${payload_2.obj}', '${payload_2.file_type}',  now())`
    );
    _final = row;
  } catch (e) {
    _final = 'Bug';
  }
  if (_final == undefined || _final === 'Bug') {
    output = 'Error';
  } else if (_final.length === 0) {
    output = 'Nothing';
  } else {
    output = 'Posted successfully.';
  }
  await _output.response(output);

  return {
    output,
  };
}

module.exports = { _insert, _insert_file, get, _alertCountSet };

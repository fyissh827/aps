const con = require('../../../../database/index.js');
const _ = require('lodash');
const _output = require('../../../../output/index.js');

async function stop(payload) {
  var _final = [];
  var output = [];

  try {
    const [row, fields] = await con.query(
      `UPDATE connectors SET notification_status  = '1'  WHERE id = '${payload.id}'`
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
    output = {
      msg: 'Removed',
    };
  }
  await _output.response(output);

  return {
    output,
  };
}

async function get1(payload) {
  var _final = [];
  var output = [];
  var p = '';
  if (payload.next !== null) p = `AND connectors.id < ${payload.next}`;

  try {
    const [row, fields] = await con.execute(
      `SELECT connectors.id, CASE WHEN connectors.user_1 = '${payload.id}' THEN true ELSE false END AS sender, connectors.notification_seen, connectors.relation_value, connectors.relation_status, connectors.relation_value, users.username, users.first_name, users.last_name, users.profilepic  FROM users, connectors WHERE (connectors.user_1 = users.id AND connectors.user_2 = '${payload.id}' AND connectors.relation_status = '1') OR (connectors.user_2 = users.id AND connectors.user_1 = '${payload.id}' AND connectors.notification_status = '0' AND connectors.relation_status = '2') AND users.u_status = '0' ${p} ORDER BY connectors.id DESC LIMIT ${payload.length} `
    );
    _final = row;
  } catch (e) {
    _final = e;
    console.log(e);
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

async function count(payload) {
  var _final = [];
  var output = [];

  try {
    const [row, fields] = await con.execute(
      `SELECT count(id) AS _count from connectors WHERE (user_2 = '${payload.user_id}' AND notification_seen = '0') OR (user_1 = '${payload.user_id}' AND relation_status = '2' AND notification_status = '0' AND notification_seen < '2') UNION ALL SELECT count(id) AS _count from private_message WHERE reciever = '${payload.user_id}' AND seen = '0' AND status = '0' UNION ALL SELECT COUNT(notification.id) AS _count FROM users, connectors,  notification WHERE users.id = notification.user_id  AND ((users.id = connectors.user_1 AND connectors.user_2 = '${payload.user_id}') OR (users.id = connectors.user_2 AND connectors.user_1 = '${payload.user_id}')) AND connectors.relation_status = '2' AND connectors.accept_at < notification.created_at AND notification.id > users.alertSeen AND users.u_status = '0'`
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

async function destroyed(payload) {
  console.log(payload.from);
  var _final = [],
    output = [];

  try {
    const [row, fields] = await con.execute(
      `UPDATE  connectors SET notification_seen = notification_seen + 1  WHERE (user_2 = '${payload.user_id}' OR user_1 = '${payload.user_id}') AND notification_seen <  '2' AND  id IN (${payload.from})`
    );
    _final = row;
  } catch (e) {
    console.log(e);
    _final = 'Bug';
  }
  if (_final == undefined || _final === 'Bug') {
    output = 'Nothing';
  } else if (_final.length === 0) {
    output = 'Nothing';
  } else {
    output = _final.changedRows;
  }
  await _output.response(output);

  return {
    output,
  };
}

module.exports = { stop, get1, count, destroyed };

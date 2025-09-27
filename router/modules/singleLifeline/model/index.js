const con = require('../../../../database/index.js');
const _ = require('lodash');
const _output = require('../../../../output/index.js');
const date = require('date-and-time');

async function get(payload) {
  var _final = [];
  var output = [];
  var p = '';

  try {
    const [row, fields] = await con.query(
      `SELECT  ${payload.from}.id, ${payload.from}.name, ${payload.from}.type,  ${payload.from}.file, ${payload.from}.file_type, ${payload.addedQuery} ${payload.from}.b1, ${payload.from}.b2, ${payload.from}.b3, ${payload.from}.created_at,${payload.from}_value.id AS active_id, ${payload.from}_value.value AS active, users.username, users.id AS user_id, users.first_name, users.last_name, users.profilepic, users.id AS user_id, settings.messaging, user_messaging_requests.status AS user_messaging_requests_status FROM settings, users LEFT JOIN user_messaging_requests ON user_messaging_requests.user_from = '${payload.user_id}' AND user_messaging_requests.user_to = users.id , ${payload.from} LEFT JOIN ${payload.from}_value ON ${payload.from}_value.${payload.from}_id = ${payload.from}.id AND ${payload.from}_value.user_id = '${payload.user_id}'  WHERE ${payload.from}.user_id = users.id AND settings.user_id = users.id AND ${payload.from}.id = ${payload.id} AND users.u_status = 1 `
    );

    _final = row;
  } catch (e) {
    console.log(e);
    _final = 'Bug';
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

async function getLifelineObjWithUser(payload) {
  var _final = [];
  var _final2 = [];
  var output = [];
  var p = '';
  var output2 = '';

  try {
    const [row, fields] =
      await con.query(`SELECT ${payload.obj}.id, ${payload.obj}.name, ${payload.obj}.type,  ${payload.obj}.file, ${payload.obj}.file_type, ${payload.addedQuery} ${payload.obj}.created_at
 FROM ${payload.obj}  WHERE id = ${payload.objId}`);

    _final = row;
  } catch (e) {
    _final = 'Bug';
  }
  if (_final == undefined) {
    output = 'Error';
  } else if (_final.length === 0) {
    output = 'Nothing';
  } else {
    output = _final[0];
    output.created_at = date.format(_final[0].created_at, 'ddd, MMM DD YYYY');

    try {
      const [_row, _fields] = await con.query(
        `SELECT status as messagingStatus , id as messagingStatusId  from user_messaging_requests  WHERE user_from = ${payload.user1} AND user_to = ${payload.user2} OR user_from = ${payload.user2} AND user_to = ${payload.user1}`
      );

      _final2 = _row;
    } catch (e) {
      console.log(e);
      _final2 = 'Error';
    }
    if (_final2 == undefined || _final2 == 'Error') {
      output2 = 'Error';
    } else if (_final2.length === 0) {
      output2 = 0;
    } else {
      output2 = _final2[0];
    }
    output.messagingStatus = output2.messagingStatus;
    output.messagingStatusId = output2.messagingStatusId;
  }
  await _output.response(output);

  return {
    output,
  };
}
module.exports = { get, getLifelineObjWithUser };

const con = require('../../../../database/index.js');
const _ = require('lodash');
const _output = require('../../../../output/index.js');

async function _seen(payload) {
  var _final_p = [];
  var _final = [];
  var output = [];
  var active = '';
  var __output = [];

  try {
    const [row, err] = await con.query(
      `UPDATE private_message SET seen = '1' WHERE id = '${payload.id}'`
    );
    _final_p = row;
  } catch (e) {
    _final_p = 'Bug';
  }
  if (_final_p == undefined || _final_p === 'Bug') {
    output = 'Error';
  } else if (_final_p.length === 0) {
    output = 'Nothing';
  } else {
    output = _final_p;
  }
  await _output.response(output);

  return {
    output,
  };
}
async function _connect(payload) {
  var _final_p = [];
  var _final = [];
  var output = [];
  var active = '';
  var __output = [];

  try {
    const [row, err] = await con.query(
      `UPDATE users SET online = '1', socket_id = '${payload.socket_id}' WHERE id = '${payload.id}'`
    );
    _final_p = row;
  } catch (e) {
    _final_p = 'Bug';
  }
  if (_final_p == undefined || _final_p === 'Bug') {
    output = 'Error';
  } else if (_final_p.length === 0) {
    output = 'Nothing';
  } else {
    output = _final_p;
  }
  await _output.response(output);

  return {
    output,
  };
}
async function _disconnect(payload) {
  var _final_p = [];
  var _final = [];
  var output = [];
  var active = '';
  var __output = [];

  try {
    const [row, err] = await con.query(
      `UPDATE users SET online = '0', socket_id = 'free' WHERE id = '${payload.id}'`
    );
    _final_p = row;
  } catch (e) {
    _final_p = 'Bug';
  }
  if (_final_p == undefined || _final_p === 'Bug') {
    output = 'Error';
  } else if (_final_p.length === 0) {
    output = 'Nothing';
  } else {
    output = _final_p;
  }
  await _output.response(output);

  return {
    output,
  };
}

module.exports = { _seen, _connect, _disconnect };

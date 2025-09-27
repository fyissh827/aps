const con = require('../../../../database/index.js');
const _ = require('lodash');
const Joi = require('joi');
const _output = require('../../../../output/index.js');

const { profileUpdateEmitter } = require('../../../../kafka/index.js');

async function address_update(payload) {
  var _final = [];
  var output = [];

  try {
    const [row, fields] = await con.query(
      `UPDATE users SET address  = '${payload.address}' , lat = '${payload.lat}', lon ='${payload.lon}'  WHERE id = '${payload.user_id}'`
    );
    _final = row;
  } catch (e) {
    _final = 'Bug';
  }
  if (_final == undefined || _final === 'Bug') {
    output = {
      msg: 'Error',
    };
  } else if (_final.length === 0) {
    output = 'Nothing';
  } else {
    output = 'Updated';
  }
  await _output.response(output);

  return {
    output,
  };
}

async function profile_update(payload) {
  var _final = [];
  var output = [];

  try {
    const [row, fields] = await con.execute(
      `UPDATE users SET first_name = '${payload.firstname}', last_name = '${payload.lastname}' , gender = '${payload.gender}', role = '${payload.role}'   WHERE id = ${payload.id}`
    );
    _final = row;
  } catch (e) {
    _final = 'Bug';
  }
  if (_final == undefined) {
    output = 'Error';
  } else if (_final.length === 0) {
    output = 'Nothing';
  } else {
    profileUpdateEmitter.emit('greet', payload);
    console.log('done');
    output = 'Updated';
  }
  await _output.response(output);

  return {
    output,
  };
}

async function dob_update(payload) {
  var _final = [];
  var output = [];

  try {
    const [row, fields] = await con.execute(
      `UPDATE users SET year = '${payload.year}', month = '${payload.month}' , date = '${payload.date}' WHERE id = ${payload.id}`
    );
    _final = row;
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
}

module.exports = { address_update, profile_update, dob_update };

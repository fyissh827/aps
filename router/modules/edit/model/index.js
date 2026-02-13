const con = require('../../../../database/index.js');
const _ = require('lodash');
const Joi = require('joi');
const _output = require('../../../../output/index.js');

const syncEmitter = require('../../../../kafka/eventEmitter.js');

async function address_update(payload) {
  var _final = [];
  var output = [];
   
  try {
    const [row, fields] = await con.query(
      `UPDATE users SET address  = '${payload.address}' , lat = '${payload.lat}', lon ='${payload.lon}'  WHERE id = '${payload.user_id}'`
    );
    _final = row;
  } catch (e) {
    console.log(e);
    _final = 'Bug';
  }
  if (_final == undefined || _final === 'Bug') {
    output = {
      msg: 'Error',
    };
  } else if (_final.length === 0) {
    output = 'Nothing';
  } else {

    //sync into other dbs
       syncEmitter.emit('profileUpdateAddress', payload);
    //profileUpdateAddressEmitter.emit('profileUpdateAddress', payload)
    
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
      `UPDATE users SET first_name = '${payload.first_name}', last_name = '${payload.last_name}' , gender = '${payload.gender}', role = '${payload.role}'   WHERE id = ${payload.id}`
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
    delete payload.gender;
    console.log(payload);
   syncEmitter.emit('profileUpdate', payload);
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

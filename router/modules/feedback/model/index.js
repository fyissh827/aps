const con = require('../../../../database/index.js');
const _ = require('lodash');
const _output = require('../../../../output/index.js');

async function feedback_get({ payload = {} } = {}) {
  const access = _.forIn(payload);
  //console.log(access);
  var _final = [];
  var output = [];

  try {
    const [row, fields] = await con.query(
      `SELECT * FROM feedback  ORDER BY id DESC LIMIT ${access.payload._l} OFFSET ${access.payload._o}`
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
    const [row, fields] = await con.execute(
      `UPDATE feedback SET reply = '1' WHERE id = ${access.payload}`
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
};

const feedback_set = async ({ payload = {} } = {}) => {
  const access = _.forIn(payload);
  //console.log(access.payload._m);
  var _final = [];
  var output = [];

  try {
    const [row, fields] = await con.execute(
      `INSERT INTO feedback(name , email, message, submitted_at) VALUE('${access.payload._n}', '${access.payload._e}', '${access.payload._m}', now())`
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
    output = 'Sended';
  }
  await _output.response(output);

  return {
    output,
  };
};

module.exports = { feedback_get, feedback_update, feedback_set };

const con = require('../../../../database/index.js');
const _ = require('lodash');
const _output = require('../../../../output/index.js');
const { SearchHistory } = require('../../models/index.js');

async function insert(payload) {
  var _final = [];
  var output = [];

  try {
    const process = SearchHistory.build({
      user_id: payload.id,
      query: payload.query,
      status: '1',
    });
    const row = await process.save();
    _final = row;
  } catch (e) {
    _final = 'Bug';
  }
  if (_final == undefined) {
    output = 'Error';
  } else if (_final.length === 0) {
    output = 'Nothing';
  } else {
    output = 'Inserted';
  }
  await _output.response(output);

  return {
    output,
  };
}

const get = async (payload) => {
  const access = _.forIn(payload);

  var _final = [];
  var output = [];

  try {
    const [row, fields] = await con.execute(
      `SELECT * FROM search_history WHERE user_id = "${payload.user_id}" ORDER BY id DESC LIMIT ${payload.items} OFFSET ${payload.offset}`
    );
    _final = row;
  } catch (e) {
    _final = '';
  }
  if (_final == undefined) {
    output = '';
  } else if (_final.length === 0) {
    output = '';
  } else {
    output = _final;
  }
  await _output.response(output);

  return {
    output,
  };
};

module.exports = { insert, get };

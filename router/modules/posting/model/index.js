const _ = require('lodash');
const _output = require('../../../../output/index.js');
const { Sequelize, Op, Model, DataTypes } = require('sequelize');
const {
  Users,
  Grewtales,
  GrewtalesFile,
  Grews,
} = require('../../models/index.js');

async function _insert(payload) {
  var _final = [];
  var output = [];

  try {
    const process = Grewtales.build({
      user_id: payload.user_id,
      primitive_id: payload.primitive_id,
      accelerator: 0,
      type: '0',
      content: payload.content,
      standard: payload.standard,
      privacy: payload.privacy,
      p1: 0,
      p2: 0,
      p3: 0,
      p4: 0,
      p5: 0,
      p6: 0,
      p7: 0,
      p8: 0,
      p0: 0,
      g_status: '0',
      report: 0,
      days: 0,
    });
    const row = await process.save();
    _final = row;
  } catch (e) {
    _final = 'Bug';
  }
  if (_final == undefined || _final === 'Bug') {
    output = 'Error';
  } else if (_final.length === 0) {
    output = 'Nothing';
  } else {
    try {
      const process = Grews.build({
        primitive_id: payload.primitive_id,
        title: payload.title,
      });
      const row = await process.save();

      _final2 = row;
    } catch (e) {
      console.log(e, 2);
      _final2 = 'Bug';
    }
    if (_final2 == undefined || _final2 === 'Bug') {
      output = 'Error';
    } else if (_final2.length === 0) {
      output = 'Nothing';
    } else {
      output = _final;
    }
  }
  await _output.response(output);

  return {
    output,
  };
}

async function _insert_2(payload) {
  var _final = [];
  var output = [];

  try {
    const process = Grewtales.build({
      user_id: payload.user_id,
      primitive_id: payload.primitive_id,
      accelerator: payload.accelerator,
      type: '0',
      content: payload.content,
      w_n: payload.wn,
      standard: payload.standard,
      privacy: payload.privacy,
      p1: 0,
      p2: 0,
      p3: 0,
      p4: 0,
      p5: 0,
      p6: 0,
      p7: 0,
      p8: 0,
      p0: 0,
      g_status: '0',
      report: 0,
      days: 0,
    });
    const row = await process.save();
    _final = row;
  } catch (e) {
    _final = 'Bug';
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

async function _insert_file(payload) {
  //console.log(payload_2);
  var _final = [];
  var output = [];

  try {
    const process = GrewtalesFile.build({
      type: '0',
      parent: payload.id,
      file: payload.obj,
      webMeta: payload.webMeta,
      file_type: payload.file_type,
    });
    const row = await process.save();
    _final = row;
  } catch (e) {
    console.log(e, 3);
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

module.exports = {
  _insert,
  _insert_file,
  _insert_2,
};

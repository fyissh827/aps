const con = require('../../../../database/index.js');
const _ = require('lodash');
const _output = require('../../../../output/index.js');

async function insert(payload) {
  var _final_p1 = [];
  var _final_p = [];
  var _final = [];
  var output = [];
  var __output = [];
  var plot_value = Math.round(payload.plot + 1);
  try {
    const [row, fields] = await con.query(
      `SELECT id FROM plotters WHERE user_id = '${payload.user_id}' AND  grewtale_id =  '${payload.grew_id}'`
    );
    _final_p1 = row;
  } catch (e) {
    _final_p1 = 'Bug';
  }
  if (_final_p1 == undefined || _final_p1 === 'Bug') {
    output = 'Error';
  } else if (_final_p1.length === 0) {
    try {
      const [_row, _fields] =
        await con.query(`INSERT INTO plotters(user_id , grewtale_id , button_value) VALUES ('${payload.user_id}',
   '${payload.grew_id}', '${plot_value}')`);
      _final_p = _row;
    } catch (e) {
      _final_p = 'Bug';
    }
    if (_final_p == undefined) {
      __output = 'Error';
    } else {
      try {
        const [__row, __fields] = await con.query(
          `  UPDATE  grewtales SET p${plot_value} = p${plot_value} + 1   WHERE id = '${payload.grew_id}'`
        );
        _final = __row;
      } catch (e) {
        _final = 'Bug';
      }
      if (_final == undefined) {
        __output = 'Eror';
      } else {
        __output = {
          msg: 'Created',
        };
      }
    }

    output = __output;
  } else {
    try {
      const [_row, _fields] = await con.query(
        `UPDATE  plotters SET button_value = '${plot_value}' WHERE id = '${_final_p1[0].id}'`
      );
      _final_p = _row;
    } catch (e) {
      _final_p = 'Bug';
    }
    if (_final_p == undefined) {
      __output = 'Error';
    } else {
      try {
        const [__row, __fields] = await con.query(
          ` UPDATE  grewtales SET p${plot_value} = p${plot_value} + 1, p${payload.active} = p${payload.active} - 1  WHERE id = '${payload.grew_id}'`
        );
        _final = __row;
      } catch (e) {
        _final = 'Bug';
      }
      if (_final == undefined) {
        __output = 'Eror';
      } else {
        __output = {
          msg: 'Updated',
        };
      }
    }

    output = __output;
  }
  await _output.response(output);

  return {
    output,
  };
}
// deleted--------------------------------------------------------------------------------------------------------------------------------------------

async function deleted(payload) {
  var _final_p = [];
  var _final = [];
  var __output = [];
  var output = [];
  var plot_value = Math.round(payload.plot + 1);
  try {
    const [row, fields] = await con.execute(
      `DELETE  FROM plotters WHERE user_id = '${payload.user_id}' AND grewtale_id = '${payload.grew_id}'`
    );
    _final_p = row;
  } catch (e) {
    _final_p = 'Bug';
  }
  if (_final_p == undefined) {
    output = 'Error';
  } else if (_final_p.length === 0) {
    output = 'Nothing';
  } else {
    try {
      const [_row, _fields] = await con.execute(
        `UPDATE  grewtales SET p${plot_value} = p${plot_value} - 1 WHERE id = '${payload.grew_id}'`
      );
      _final = row;
    } catch (e) {
      _final = 'Bug';
    }
    if (_final == undefined) {
      __output = 'Error';
    } else if (_final.length === 0) {
      __output = 'Nothing';
    } else {
      __output = {
        msg: 'Deleted',
      };
    }
    output = __output;
  }
  await _output.response(output);

  return {
    output,
  };
}

module.exports = { insert, deleted };

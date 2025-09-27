const con = require('../../../../database/index.js');
const _ = require('lodash');
const _output = require('../../../../output/index.js');

async function insert_past(payload) {
  var final = null,
    final2 = null,
    output = null;

  if (payload.active === null || payload.active === 0) {
    try {
      const [_row, _fields] =
        await con.query(`INSERT INTO ${payload.type}_value(user_id , ${payload.type}_id, value, status ) VALUES ('${payload.user_id}',
		  '${payload.id}', '${payload.button}', '1')`);
      final = _row;
      console.log(final);
    } catch (e) {
      console.log(e, 20);
      final = 'Bug';
    }
    if (final === undefined || final === 'Bug') {
      output = { msg: 'Error', plotterValueId: null };
    } else {
      try {
        const [__row, __fields] = await con.query(
          `  UPDATE  ${payload.type} SET b${payload.button} = b${payload.button} + 1  WHERE id = '${payload.id}'`
        );
        final2 = __row;
      } catch (e) {
        console.log(e, 31);
        final2 = 'Bug';
      }
      if (final2 === undefined || final2 === 'Bug') {
        output = { msg: 'Error', plotterValueId: null };
      } else {
        output = { msg: 'Inserted', plotterValueId: final.insertId };
      }
    }
  } else {
    try {
      const [_row2, _fields] = await con.query(
        `UPDATE  ${payload.type}_value SET  value  = '${payload.button}' WHERE id = '${payload.plotter_id}'`
      );
      final = _row2;
    } catch (e) {
      console.log(e, 46);
      final = 'Bug';
    }
    if (final === undefined || final === 'Bug') {
      output = { msg: 'Error', plotterValueId: payload.plotter_id };
    } else {
      try {
        const [__row3, __fields] = await con.query(
          `  UPDATE  ${payload.type} SET b${payload.button} = b${payload.button} + 1, b${payload.active} = b${payload.active} - 1  WHERE id = '${payload.id}'`
        );
        final2 = __row3;
      } catch (e) {
        console.log(e, 57);
        final2 = 'Bug';
      }
      if (final2 === undefined || final2 === 'Bug') {
        output = { msg: 'Error', plotterValueId: payload.plotter_id };
      } else {
        output = { msg: 'Updated', plotterValueId: payload.plotter_id };
      }
    }
  }

  return { output };
}
// deleted--------------------------------------------------------------------------------------------------------------------------------------------

async function deleted_past(payload) {
  var _final_p = [];
  var _final = [];
  var __output = [];
  var output = [];
  var plot_value = Math.round(payload.plot + 1);
  try {
    const [row4, fields] = await con.execute(
      `DELETE  FROM ${payload.type}_value WHERE id = '${payload.plotter_id}'`
    );
    _final_p = row4;
  } catch (e) {
    console.log(e, 86);
    _final_p = 'Bug';
  }
  if (_final_p == undefined || _final_p === 'Bug') {
    output = { msg: 'Error1', plotterValueId: payload.plotter_id };
  } else {
    try {
      const [_row5, _fields] = await con.execute(
        `UPDATE  ${payload.type} SET b${payload.button} = b${payload.button} - 1  WHERE id = '${payload.id}'`
      );
      _final = _row5;
    } catch (e) {
      console.log(e, 98);
      _final = 'Bug';
    }
    if (_final == undefined || _final === 'Bug') {
      __output = { msg: 'Error2', plotterValueId: payload.plotter_id };
    } else {
      __output = { msg: 'Deleted', plotterValueId: payload.plotter_id };
    }
    output = __output;
  }
  await _output.response(output);

  return {
    output,
  };
}

async function insert_future(payload) {
  var _final_p1 = [];
  var _final_p = [];
  var _final = [];
  var output = [];
  var __output = [];

  try {
    const [row, fields] = await con.query(
      `SELECT id FROM future_value WHERE user_id = '${payload.user_id}' AND  future_id =  '${payload.id}'`
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
        await con.query(`INSERT INTO future_value(user_id , future_id ) VALUES ('${payload.user_id}',
   '${payload.id}')`);
      _final_p = _row;
    } catch (e) {
      _final_p = 'Bug';
    }
    if (_final_p == undefined) {
      __output = 'Error';
    } else {
      try {
        const [__row, __fields] = await con.query(
          `  UPDATE  future SET button = button + 1  WHERE id = '${payload.id}'`
        );
        _final = __row;
      } catch (e) {
        _final = 'Bug';
      }
      if (_final == undefined) {
        __output = 'Eror';
      } else {
        __output = 'Created';
      }
    }

    output = __output;
  } else {
  }
  await _output.response(output);

  return {
    output,
  };
}
// deleted--------------------------------------------------------------------------------------------------------------------------------------------

async function deleted_future(payload) {
  var _final_p = [];
  var _final = [];
  var __output = [];
  var output = [];
  var plot_value = Math.round(payload.plot + 1);
  try {
    const [row, fields] = await con.execute(
      `DELETE  FROM future_value WHERE user_id = '${payload.user_id}' AND future_id = '${payload.id}'`
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
        `UPDATE  future SET button = button - 1  WHERE id = '${payload.id}'`
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
      __output = 'Deleted';
    }
    output = __output;
  }
  await _output.response(output);

  return {
    output,
  };
}

async function insert_present(payload) {
  var _final_p1 = [];
  var _final_p = [];
  var _final = [];
  var output = [];
  var __output = [];

  try {
    const [row, fields] = await con.query(
      `SELECT id FROM present_value WHERE user_id = '${payload.user_id}' AND  present_id =  '${payload.id}'`
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
        await con.query(`INSERT INTO present_value(user_id , present_id ) VALUES ('${payload.user_id}',
   '${payload.id}')`);
      _final_p = _row;
    } catch (e) {
      _final_p = 'Bug';
    }
    if (_final_p == undefined) {
      __output = 'Error';
    } else {
      try {
        const [__row, __fields] = await con.query(
          `  UPDATE  present SET button = button + 1  WHERE id = '${payload.id}'`
        );
        _final = __row;
      } catch (e) {
        _final = 'Bug';
      }
      if (_final == undefined) {
        __output = 'Eror';
      } else {
        __output = 'Created';
      }
    }

    output = __output;
  } else {
  }
  await _output.response(output);

  return {
    output,
  };
}
// deleted--------------------------------------------------------------------------------------------------------------------------------------------

async function deleted_present(payload) {
  var _final_p = [];
  var _final = [];
  var __output = [];
  var output = [];
  var plot_value = Math.round(payload.plot + 1);
  try {
    const [row, fields] = await con.execute(
      `DELETE  FROM present_value WHERE user_id = '${payload.user_id}' AND present_id = '${payload.id}'`
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
        `UPDATE  present SET button = button - 1  WHERE id = '${payload.id}'`
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
      __output = 'Deleted';
    }
    output = __output;
  }
  await _output.response(output);

  return {
    output,
  };
}

module.exports = {
  insert_past,
  insert_present,
  insert_future,
  deleted_past,
  deleted_present,
  deleted_future,
};

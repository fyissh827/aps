const con = require('../../../../database/index.js');
const _ = require('lodash');
const _output = require('../../../../output/index.js');

async function past(payload) {
  var _final = [];
  var output = [];
  var p = '';
  if (payload.next !== null) p = `AND past.id < ${payload.next}`;

  try {
    const [row, fields] =
      await con.query(`SELECT past.id, past.type, past.created_at, past.name, past.file, past.file_type, past.date_1st, past.date_2nd, past.date_type, past.location, SUBSTRING(past.how, 1, 2) AS how, SUBSTRING(past.try, 1, 2) AS try,  SUBSTRING(past.story, 1, 2) AS story,  users.first_name, users.last_name, users.profilepic, users.u_status, users.username  FROM past , users WHERE past.user_id = users.id  AND past.name LIKE "${'%' + payload._h + '%'}" AND users.u_status = "0" ${p} ORDER BY  past.id DESC LIMIT ${payload.length}
   `);
    _final = row;
  } catch (e) {
    _final = 'Bug';
  }
  if (_final == undefined) {
    output = 'Error';
  } else if (_final.length === 0) {
    output = 'nothing';
  } else {
    output = _final;
  }
  await _output.response(output);

  return {
    output,
  };
}

async function present(payload) {
  var _final = [];
  var output = [];
  var p = '';
  if (payload.next !== null) p = `AND present.id < ${payload.next}`;
  try {
    const [row, fields] =
      await con.query(`SELECT present.id, present.type, present.created_at, present.name, present.file, present.file_type, present.date_1st, present.date_2nd, present.date_type, present.location, SUBSTRING(present.how, 1, 2) AS how, SUBSTRING(present.try, 1, 2) AS try,  SUBSTRING(present.story, 1, 2) AS story,  users.first_name, users.last_name, users.profilepic, users.u_status, users.username  FROM present , users WHERE present.user_id = users.id  AND present.name LIKE "${'%' + payload._h + '%'}" AND users.u_status = "0"  ${p} ORDER BY  present.id DESC LIMIT ${payload.length}
   `);
    _final = row;
  } catch (e) {
    _final = 'Bug';
  }
  if (_final == undefined) {
    output = 'Error';
  } else if (_final.length === 0) {
    output = 'nothing';
  } else {
    output = _final;
  }
  await _output.response(output);

  return {
    output,
  };
}
async function future(payload) {
  var _final = [];
  var output = [];
  var p = '';
  if (payload.next !== null) p = `AND future.id < ${payload.next}`;
  try {
    const [row, fields] =
      await con.query(`SELECT future.id, future.type, future.created_at, future.name, future.file, future.file_type, future.date_1st, future.date_2nd, future.date_type, future.location, SUBSTRING(future.try, 1, 2) AS try,   users.first_name, users.last_name, users.profilepic, users.u_status, users.username  FROM future , users WHERE future.user_id = users.id  AND future.name LIKE "${'%' + payload._h + '%'}" AND users.u_status = "0" ${p} ORDER BY  future.id DESC LIMIT ${payload.length}
   `);
    _final = row;
  } catch (e) {
    _final = 'Bug';
  }
  if (_final == undefined) {
    output = 'Error';
  } else if (_final.length === 0) {
    output = 'nothing';
  } else {
    output = _final;
  }
  await _output.response(output);

  return {
    output,
  };
}

async function subject(payload) {
  var _final = [];
  var output = [];
  var p = '';
  if (payload.next !== null) p = `AND subject.id < ${payload.next}`;
  try {
    const [row, fields] =
      await con.query(`SELECT subject.id, subject.type, subject.created_at, subject.name, subject.meaning, subject.file, subject.file_type,  users.first_name, users.last_name, users.profilepic, users.u_status, users.username  FROM subject , users  WHERE subject.user_id = users.id  AND subject.name LIKE "${'%' + payload._h + '%'}" AND users.u_status = "0" ${p} ORDER BY  subject.id DESC LIMIT  ${payload.length}
   `);
    _final = row;
  } catch (e) {
    _final = 'Bug';
  }
  if (_final == undefined) {
    output = 'Error';
  } else if (_final.length === 0) {
    output = 'nothing';
  } else {
    output = _final;
  }
  await _output.response(output);

  return {
    output,
  };
}

async function user(payload) {
  var _final = [];
  var output = [];
  var p = '';
  if (payload.next !== null) p = `AND id < "${payload.next}"`;
  var s = payload._h.split(' '),
    l = s.length,
    f = s[0],
    e = s[l - 1];

  console.log(f, e);

  try {
    const [row, fields] = await con.query(
      `SELECT id, first_name, last_name, profilepic, username, role, address  FROM users WHERE ((first_name LIKE "${'%' + f + '%'}" OR last_name LIKE "${'%' + e + '%'}") AND u_status = '0' AND NOT id = "${payload._m}") OR ((last_name LIKE "${'%' + f + '%'}" OR first_name LIKE "${'%' + e + '%'}") AND u_status = '0') ${p} AND NOT id = "${payload._m}"  ORDER BY id LIMIT ${payload.length}`
    );
    _final = row;
  } catch (e) {
    console.log(e);
    _final = 'Bug';
  }
  if (_final == undefined) {
    output = 'Error';
  } else if (_final.length === 0) {
    output = 'nothing';
  } else {
    output = _final;
  }
  await _output.response(output);

  return {
    output,
  };
}

const grewtales = async (payload) => {
  const access = _.forIn(payload);

  var _final = [],
    p = '';
  if (payload.next !== null) p = `AND grewtales.id < ${payload.next}`;

  try {
    const [row, fields] = await con.execute(
      `SELECT grewtales.id,grewtales.primitive_id,grewtales.g_status,grewtales.privacy,grewtales.user_id,CASE WHEN user_id='${payload._m}'THEN'YOU' ELSE'Another ' END AS who,grewtales.primitive_id,grewtales.w_n, grewtales.type, grewtales.content,grewtales.created_at,grewtales_file.file,grewtales_file.file_type, grews.title FROM grewtales , grewtales_file, users, grews WHERE grewtales.id=grewtales_file.parent   AND grewtales.primitive_id = grews.primitive_id AND users.id = grewtales.user_id ${p} AND (grews.title LIKE "${'%' + payload._h + '%'}" AND NOT grewtales.privacy = '2' AND grewtales.g_status= '0'  OR grewtales.w_n LIKE "${'%' + payload._h + '%'}" AND NOT grewtales.privacy = '2' AND grewtales.g_status= '0')   ORDER BY id DESC LIMIT  ${payload.length}`
    );
    console.log(fields);
    output = row;
  } catch (e) {
    console.log(e);
    output = 'Bug';
  }

  await _output.response(output);

  return {
    output,
  };
};

module.exports = { past, present, future, subject, user, grewtales };

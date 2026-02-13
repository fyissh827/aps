const con = require('../../../../database/index.js'),
  _ = require('lodash'),
  _output = require('../../../../output/index.js');
async function home_g(e) {
  var t = [],
    r = [],
    p = '',
    s = [];
  if (e.next !== null) {
    p = `AND grewtales.id < ${e.next}`;
  }
  try {
    const [r, s] = await con.query(
      `SELECT  grewtales.id, grewtales.accelerator, grewtales.w_n, grewtales.g_status , grewtales.user_id AS person,  grewtales.type, SUBSTRING(grewtales.content, 1, 250) AS content, CASE WHEN CHAR_LENGTH(grewtales.content) > 249 THEN false ELSE true END AS fullContentAvailibility, grewtales.standard, grewtales.privacy, grewtales.primitive_id, grewtales.created_at ,grewtales_file.file_type, grewtales_file.webMeta, grewtales_file.file, grewtales.p1, grewtales.p2, grewtales.p3, grewtales.p4, grewtales.p5, grewtales.p6, grewtales.p7, grewtales.p8, grewtales.p0, users.username, users.first_name, users.last_name, users.profilepic, users.u_status, grews.title, plotters.button_value AS active , plotters.id AS plotterValueId  FROM   users, grewtales_file,  grews, grewtales LEFT JOIN plotters ON plotters.grewtale_id = grewtales.id AND plotters.user_id = '${e.user_id}' WHERE grewtales.user_id = users.id AND grewtales_file.parent  = grewtales.id AND grews.primitive_id = grewtales.primitive_id AND NOT grewtales.privacy = '2' AND grewtales.g_status = '0' AND users.u_status = '0' ${p} ORDER BY grewtales.id DESC LIMIT ${e.length}`
    );
    t = r;
  } catch (e) {
    t = 'Bug';
  }
  if (null == t) s = 'Error';
  else if (0 === t.length) s = 'Nothing';
  else {
    s = t;
  }
  return (
    await _output.response(s),
    {
      output: s,
    }
  );
}
async function home_g_connection(e) {
  var t = [],
    r = [],
    p = '',
    s = [];
  if (e.next !== null) {
    p = `AND grewtales.id < ${e.next}`;
  }
  try {
    const [r, s] = await con.query(
      `SELECT  grewtales.id, grewtales.accelerator, grewtales.w_n, grewtales.g_status , grewtales.user_id AS person,  grewtales.type, SUBSTRING(grewtales.content, 1, 250) AS content, CASE WHEN CHAR_LENGTH(grewtales.content) > 249 THEN false ELSE true END AS fullContentAvailibility, grewtales.standard, grewtales.privacy, grewtales.primitive_id, grewtales.created_at ,grewtales_file.file_type, grewtales_file.webMeta, grewtales_file.file, grewtales.p1, grewtales.p2, grewtales.p3, grewtales.p4, grewtales.p5, grewtales.p6, grewtales.p7, grewtales.p8, grewtales.p0, users.username, users.first_name, users.last_name, users.profilepic, users.u_status, grews.title,  plotters.button_value AS active , plotters.id AS plotterValueId   FROM   users, grewtales_file, grews, connectors, grewtales LEFT JOIN plotters ON plotters.grewtale_id = grewtales.id AND plotters.user_id = '${e.user_id}' WHERE grewtales.user_id = users.id AND ((users.id = connectors.user_1 AND connectors.user_2 = '${e.user_id}') OR (users.id = connectors.user_2 AND connectors.user_1 = '${e.user_id}')) AND connectors.relation_status = '2' AND grewtales_file.parent  = grewtales.id AND grews.primitive_id = grewtales.primitive_id AND NOT grewtales.privacy = '2' AND grewtales.g_status = '0' AND users.u_status = '0' ${p} ORDER BY grewtales.id DESC LIMIT ${e.length}`
    );
    t = r;
  } catch (e) {
    t = 'Bug';
  }
  if (null == t) s = 'Error';
  else if (0 === t.length) s = 'Nothing';
  else {
    s = t;
  }
  return (
    await _output.response(s),
    {
      output: s,
    }
  );
}
async function competition_g(e) {
  var t = [],
    r = [],
    s = [],
    a = [];
  var p = '';
  if (e.next !== null) p = `AND grewtales.id > ${e.next}`;
  try {
    const [r, s] = await con.query(
      `SELECT  grewtales.id, grewtales.accelerator, grewtales.w_n, grewtales.g_status , grewtales.user_id AS person,  grewtales.type, SUBSTRING(grewtales.content, 1, 250) AS content, CASE WHEN CHAR_LENGTH(grewtales.content) > 249 THEN false ELSE true END AS fullContentAvailibility, grewtales.standard, grewtales.privacy, grewtales.primitive_id, grewtales.created_at ,grewtales_file.file_type, grewtales_file.webMeta, grewtales_file.file, grewtales.p1, grewtales.p2, grewtales.p3, grewtales.p4, grewtales.p5, grewtales.p6, grewtales.p7, grewtales.p8, grewtales.p0, users.username, users.first_name, users.last_name, users.profilepic, users.u_status, grews.title, plotters.button_value AS active , plotters.id AS plotterValueId   FROM  users, grews, grewtales_file, grewtales LEFT JOIN plotters ON plotters.grewtale_id = grewtales.id AND plotters.user_id = '${e.user_id}' WHERE grewtales.user_id = users.id AND grewtales_file.parent  = grewtales.id AND grews.primitive_id = grewtales.primitive_id AND  NOT grewtales.privacy = '2' AND grewtales.g_status = '0' AND grews.primitive_id = '${e._p}' ${p} AND users.u_status = '0' ORDER BY grewtales.id ASC LIMIT ${e.length}`
    );
    t = r;
  } catch (e) {
    t = 'Bug';
  }
  if (null == t) s = 'Error';
  else if (0 === t.length) s = 'Nothing';
  else {
    s = t;
  }
  return (
    await _output.response(s),
    {
      output: s,
    }
  );
}
async function post(e) {
  var t = [],
    r = [],
    s = [],
    a = [],
    l = [];
  try {
    const [r, s] = await con.query(
      `SELECT  grewtales.id, grewtales.accelerator, grewtales.w_n, grewtales.g_status , grewtales.user_id AS person,  grewtales.type, grewtales.content, 1 as fullContentAvailibility, grewtales.standard, grewtales.privacy, grewtales.primitive_id, grewtales.created_at ,grewtales_file.file_type, grewtales_file.webMeta, grewtales_file.file, grewtales.p1, grewtales.p2, grewtales.p3, grewtales.p4, grewtales.p5, grewtales.p6, grewtales.p7, grewtales.p8, grewtales.p0, users.username, users.first_name, users.last_name, users.profilepic, users.u_status, grews.title , plotters.button_value AS active , plotters.id AS plotterValueId   FROM grewtales_file , grews, users, grewtales LEFT JOIN plotters ON plotters.grewtale_id = grewtales.id AND plotters.user_id = '${e.user_id}'  WHERE grewtales.id = grewtales_file.parent AND  grewtales.user_id = users.id AND grewtales.primitive_id = grews.primitive_id AND grewtales.id = '${e.id}' AND grewtales.g_status = '0' AND users.u_status = '0' `
    );
    t = r;
  } catch (e) {
    t = 'Bug';
  }
  if (null == t) s = 'Error';
  else if (0 === t.length) s = 'Nothing';
  else {
    s = t;
  }
  return (
    await _output.response(s),
    {
      output: s,
    }
  );
}
async function getContent(e) {
  var t = [],
    r = [],
    s = [],
    a = [],
    l = [];
  try {
    const [r, s] = await con.query(
      `SELECT content from grewtales where id = '${e.id}'`
    );
    t = r;
  } catch (e) {
    t = 'Bug';
  }
  if (null == t) s = 'Error';
  else if (0 === t.length) s = 'Nothing';
  else {
    s = t;
  }
  return (
    await _output.response(s),
    {
      output: s,
    }
  );
}
module.exports = {
  home_g: home_g,
  competition_g: competition_g,
  post: post,
  home_g_connection: home_g_connection,
  getContent: getContent,
};

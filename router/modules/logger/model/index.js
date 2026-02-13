const con = require('../../../../database/index.js');
const _ = require('lodash');
const _output = require('../../../../output/index.js');
const {
  Users,
  user_messaging_rules,
  Settings,
} = require('../../models/index.js');

async function me(payload) {
  var _final = [];
  var output = [];

  try {
    Users.hasOne(Settings, {
      foreignKey: 'user_id',
    }); // A HasOne B
    Users.hasOne(user_messaging_rules, {
      foreignKey: 'user_id',
    });

    const [row] = await Users.findAll({
      attributes: [
        'id',
        'username',
        'email',
        'password',
        'first_name',
        'last_name',
        'profilepic',
        'address',
        'gender',
        'role',
        'origin',
        'verified',
        'phone',
        'year',
        'month',
        'date',
        'alertSeen',
      ],
      where: {
        id: payload.id,
      },
      //: [
      //	{
      //	  model: user_messaging_rules,
      //	  as: 'Instruments',
      //	},
      //  ],
      //  ],
      include: [
        {
          model: Settings,
        },
        {
          model: user_messaging_rules,
          attributes: ['rules'],
        },
      ],
      //include:user_messaging_rules,
      //include:Settings
    });
    _final = row.dataValues;
    console.log(_final);
  } catch (e) {
    console.log(e);
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

async function me_address(payload) {
  const access = _.forIn(payload);

  var _final = [];
  var output = [];

  try {
    const [row, fields] =
      await con.execute(`SELECT  countries.name , states.sname, cities.cname FROM users INNER JOIN countries ON users.country = countries.id 
 JOIN states ON users.state = states.id
JOIN cities ON users.city = cities.id
 WHERE users.id =
' ${payload.id}'


`);
    _final = row;
  } catch (e) {
    _final = 'Bug';
  }
  if (_final == undefined) {
    output = 'Error';
  } else if (_final.length === 0) {
    output = 'Nothing';
  } else {
    output = _final[0];
  }
  await _output.response(output);

  return {
    output,
  };
}

module.exports = { me, me_address };

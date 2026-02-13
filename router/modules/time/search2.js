const date = require('date-and-time');
module.exports = {
  system: (req, res, next) => {
    var data = [];
    var ob = req.data;
    for (var i = 0; i < ob.length; i++) {
      var fields = {
        first_name: ob[i].first_name,
        last_name: ob[i].last_name,
        profilepic: ob[i].profilepic,
        username: ob[i].username,
        name: ob[i].name,
        meaning: ob[i].meaning,
        type: ob[i].type,
        file: ob[i].file,
        file_type: ob[i].file_type,
        _date: date.format(ob[i].created_at, 'ddd, DD-MM-YYYY'),
      };

      data.push({
        id: fields.id,
        first_name: fields.first_name,
        last_name: fields.last_name,
        profilepic: fields.profilepic,
        username: fields.username,
        name: fields.name,
        meaning: fields.meaning,
        type: fields.type,
        file: fields.file,
        file_type: fields.file_type,
        created_at: fields._date,
      });
    }
    res.json(data);
  },
};

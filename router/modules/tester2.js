const date = require('date-and-time');
module.exports = {
  system: (req, res) => {
    var final = [];
    const obj = req.data;
    for (var i = 0; i < obj.data.length; i++) {
      var index = null;
      const now = obj.data[i].created_at;
      var filter_date = date.format(now, 'ddd, MMM DD YYYY');
      for (var j = 0; j < obj.active.length; j++) {
        if (obj.active[j].past_id === obj.data[i].id) {
          index = j;
        }
      }
      var f = 0;
      if (index !== null) {
        f = 1;
      }
      final.push({
        active: f,
        id: obj.data[i].id,
        name: obj.data[i].name,
        type: obj.data[i].type,
        file: obj.data[i].file,
        file_type: obj.data[i].file_type,
        button: obj.data[i].button,
        created_at: filter_date,
        username: obj.data[i].username,
        user_id: obj.data[i].user_id,
      });
    }
    res.json(final);
  },
};

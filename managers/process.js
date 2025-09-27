(nextFormation = (a, b, c) => {
  var key = c;
  if (c === undefined || c === '') key = 'id';
  if (a.length < b.length) {
    var data = null;
  } else {
    var t = a[a.length - 1];
    if (t.data !== undefined || typeof t.data === 'object') {
      data = a[a.length - 1].data[key];
    } else {
      data = a[a.length - 1][key];
    }
  }
  return data;
}),
  (messageReplySet = (d) => {
    var a = [];
    for (var i = 0; i < d.length; i++) {
      var data = d[i];

      data.reply = null;

      if (data.r_id !== null) {
        data.reply = {
          id: data.r_id,
          seen: data.r_seen,
          message: data.r_message,
          file: data.r_file,
          file_type: data.r_file_type,
        };
      }
      delete data.r_id;
      delete data.r_seen;
      delete data.r_message;
      delete data.r_file, delete data.r_file_type;
      console.log(data);

      a.push(data);
    }
    return a;
  });
module.exports = { nextFormation, messageReplySet };

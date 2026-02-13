//const con = require('../../../database/index.js');
const u = require('./pp.json');
module.exports = {
  async test(req, res) {
    const payload = [];

    //{"id":234,"type":"0","parent":427,"file":"[{\"name\":\"59_5454_1632457401459\"}]","file_type":0,"created_at":"2021-09-24T04:23:21.000Z"}

    //({name : '', t : '', e2 : [], e : [], p : []})

    //  const [row ,fields] = await con.execute(`SELECT * FROM grewtales_file`);
    // _final = row;

    for (var i = 0; i < u.length; i++) {
      var p = JSON.parse(u[i].file);
      var t = [];
      if (p.length > 0) {
        if (u[i].file_type === 0) {
          for (var j = 0; j < p.length; j++) {
            var f = { name: p[j].name, t: 1, e2: [], e: [], p: [] };
            t.push(f);
          }
        } else if (u[i].file_type === 1) {
          for (var j = 0; j < p.length; j++) {
            var m = { name: p[j].name, t: 2, e2: [], e: [], p: [] };
            var g = { name: p[j + 1].name, t: 1 };
            m.p.push(g);
            p.splice(j + 1, 1);
            t.push(m);
          }
        }
      }
      var n = JSON.stringify(t);
      u[i].file = n;
      payload.push(u[i]);
    }

    res.json(payload);
  },
};

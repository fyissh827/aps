const { timing } = require('../../managers/timing.js');
const hashing = require('../../managers/hashing.js');
const date = require('date-and-time');
module.exports = {
  system: (t, k) => {
    console.log(t, k);

    var r = [];

    i = k;

    for (var s = 0; s < i.length; s++) {
      var t = i[s],
        e = timing(t.created_at);
      var a = 0;
      if (t.active !== null) a = t.active;
      r.push({
        data: {
          id: t.id,
          username: t.username,
          first_name: t.first_name,
          w_n: t.w_n,
          type: t.type,
          last_name: t.last_name,
          profilepic: t.profilepic,
          title: t.title,
          content: t.content,
          fullContentAvailibility: t.fullContentAvailibility,
          standard: t.standard,
          accelerator: t.accelerator,
          privacy: t.privacy,
          primitive_id: t.primitive_id,
          file: hashing.dimensionHashing(t.file),
          file_type: t.file_type,
          profilepic: t.profilepic,
          g_status: t.g_status,
          person: t.person,
          webMeta: t.webMeta,
          p1: t.p1,
          p2: t.p2,
          p3: t.p3,
          p4: t.p4,
          p5: t.p5,
          p6: t.p6,
          p7: t.p7,
          p8: t.p8,
          time: e.t,
          format: e.f,
          date: date.format(t.created_at, 'DD MMM YYYY'),
          plotterValueId: t.plotterValueId,
        },
        active: a,
      });
    }
    //const z = hashing.urlHashing(t._ob.data[0].file, t.userData.userId, t.path);
    //console.log(z);
    return r;
  },
};

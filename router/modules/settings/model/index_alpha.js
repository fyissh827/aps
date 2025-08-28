const con = require("../../../../database/index.js"),
    _ = require("lodash"),
    _output = require("../../../../output/index.js"),
    {
        user_messaging_rules: user_messaging_rules
    } = require("../../models/index.js");
async function username(e) {
    var t = [],
        s = [],
        n = [];
    try {
        const [s, n] = await con.execute(`SELECT * FROM users WHERE username = '${e.username}' AND NOT id = '${e.id}'`);
        t = s
    } catch (e) {
        t = e
    }
    if (null == t) n = "Error";
    else if (t.length > 0) n = "You cannot use this Username";
    else {
        t.insertId;
        try {
            const [t, n] = await con.execute(`UPDATE users SET username = '${e.username}' WHERE id = '${e.id}'`);
            s = t
        } catch (e) {
            s = e
        }
        n = null == s ? "Error" : 0 === s.length ? "Nothing" : "Updated"
    }
    return await _output.response(n), {
        output: n
    }
}
async function phone(e) {
    var t = [],
        s = [],
        n = [];
    try {
        const [s, n] = await con.execute(`SELECT * FROM users WHERE phone = '${e.phone}' AND NOT id = '${e.id}'`);
        t = s
    } catch (e) {
        t = e
    }
    if (null == t) n = "Error";
    else if (t.length > 0) n = "You cannot use this phone";
    else {
        t.insertId;
        try {
            const [t, n] = await con.execute(`UPDATE users SET phone = '${e.phone}' WHERE id = '${e.id}'`);
            s = t
        } catch (e) {
            s = e
        }
        n = null == s ? "Error" : 0 === s.length ? "Nothing" : "Updated"
    }
    return await _output.response(n), {
        output: n
    }
}
async function email(e) {
    var t = [],
        s = [],
        n = [];
    try {
        const [s, n] = await con.execute(`SELECT * FROM users WHERE email = '${e.email}' AND NOT id = '${e.id}'`);
        t = s
    } catch (e) {
        t = e
    }
    if (null == t) n = "Error";
    else if (t.length > 0) n = "You cannot use this email";
    else {
        t.insertId;
        try {
            const [t, n] = await con.execute(`UPDATE users SET email = '${e.email}' WHERE id = '${e.id}'`);
            s = t
        } catch (e) {
            s = e
        }
        n = null == s ? "Error" : 0 === s.length ? "Nothing" : "Updated"
    }
    return await _output.response(n), {
        output: n
    }
}
async function messaging_rules(e) {
    var t = [],
        s = [],
        n = [];
    try {
        const [s, n] = await con.execute(`SELECT * FROM user_messaging_rules WHERE user_id = '${e._m}'`);
        t = s
    } catch (e) {
        t = e
    }
    if (null == t) n = "Error";
    else if (t.length > 0) {
        t.insertId;
        try {
            const [t, n] = await con.execute(`UPDATE user_messaging_rules SET rules = '${e._h}' WHERE user_id = '${e._m}'`);
            s = t
        } catch (e) {
            s = e
        }
        n = null == s ? "Error" : 0 === s.length ? "Nothing" : "Updated"
    } else {
        var h = null;
        try {
            var r = user_messaging_rules.build({
                user_id: e._m,
                rules: e._h,
                set_at : Date.now()
            });
           h =  await r.save();
          console.log(h);
        } catch (e) {
           
            s = e
        }
        n = null == s ? "Error" :  (undefined === h.dataValues && undefined === h.dataValues.id) ? "Nothing" : "Added"
    }
    return await _output.response(n), {
        output: n
    }
}
module.exports = {
    username: username,
    email: email,
    phone: phone,
    messaging_rules: messaging_rules
};
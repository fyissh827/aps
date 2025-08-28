//const e = require('cors');
const axios = require('axios').default;
const client = require('../../../database/redis.js'); 
const  con  = require('../../../database/index.js'); 
const u = require('./ui.json'); 
const { FATAL } = require('bunyan');
module.exports = {

  async test(req, res){
    
   
  var c = [];
  if(req.params.i == 1){
    const [row, fields] = await con.execute(`SELECT * FROM users`);
	var m = row;
   for (var i = 0; i < m.length; i++){
     var t = m[i];
    var p = {};
     p.first_name = t.first_name;
     p.last_name = t.last_name;
     p.username = t.username;
     p.id = t.id;
     p.profilepic = t.profilepic;
     p.email = t.email;
     p.status = t.u_status
    
    
    c.push(p);
  }
  res.json(c);
}
else if(req.params.i == 2){
  var b = 0;
  for(var i = 0; i < u.length; i++){
     const value = await client.sendCommand(['HMSET', `u:id:${u[i].id}`, `1`, `${u[i].first_name}`, '2', `${u[i].last_name}`,  '3', `${u[i].id}`,  '4', `${u[i].username}`,  '5', `${u[i].profilepic}`,  '6', `${u[i].email}`, '7', `${u[i].status}`]);
    console.log(value);
     if(value == "OK"){
       b = b + 1
     }
     
  }
  res.json(b);
}
else if(req.params.i == 3){
//  FT.CREATE usersearch ON HASH PREFIX 1 'u:' SCHEMA $.first_name AS firstname TEXT NOSTEM  $.last_name AS lastname TEXT NOSTEM $.username AS username TEXT NOSTEM $.id AS id NUMERIC SORTABLE

}
  }
      
      
   
   
  
}




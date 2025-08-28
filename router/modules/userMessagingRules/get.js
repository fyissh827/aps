
const Model = require('./model/index');


module.exports = {

async get(p){
const r = await Model.get(p);
 return r.output[0];
},
  }
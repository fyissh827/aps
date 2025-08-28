const client = require('../../../database/redis.js'); 
const { transformArguments, transformReply } = require ('@node-redis/search/dist/commands/SEARCH');

module.exports = {

async realTimeSearch(req, res){
  var f = [];
const query = req.body.query;


////if(query.length === 1 || (query.length === 2 && query[query.length - 1].length === 1)) var parQuery = `(@firstname:${query[0]}*) | (@lastname:${query[0]}*) | (@username:${query[0]}*) -(@id:[${req.body.id} ${req.body.id}])`;
//else parQuery = `(@firstname:${query[0]}*)  (@lastname:${query[1]}*)  -(@id:[${req.body.id} ${req.body.id}])`
  

//searchArgs = transformArguments('usersearch', `${parQuery}`);
//  searchArgs.push('SORTBY', 'visitingCount');
//  searchArgs.push('LIMIT', `${req.body.offset}`, `${req.body.length}`);
//const reply = transformReply(await client.sendCommand(searchArgs));

res.json([]);


  
  



}


}
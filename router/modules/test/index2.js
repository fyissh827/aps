const {Users, Grewtales, GrewtalesFile, Grews, PrivateMessage} = require("../models/index.js");
const { Sequelize } = require("sequelize");
module.exports = {
async  test(req, res) {
  const users = await PrivateMessage.findAll({
     attributes : [
        
       [Sequelize.literal('(MAX(id) OVER (ORDER BY sender DESC))'), 'rank'],
       
     ]
  });
  

 
 

 
 // users.hasMany(grewtales);
 res.json(users, null, 2)
}
}
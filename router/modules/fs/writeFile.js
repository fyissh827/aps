
var fs = require('file-system');
module.exports = {

async writeFile(req, res)  {

	 var data = req;
 console.log(data);
 fs.writeFile('./test.txt', data, function(err) {

console.log(err);
 })
   
   res.json("filemaded");

 }
 
 }




 //const con = require('../../../database/index.js'); 
 const Model = require('./model/index');
 module.exports = {
 
 async report_comment(req, res){
     
 
     
     
 const payload = {
  id : req.body.id,
   
  };
  
  
 
 
 
 
 const _model = await  Model.report_comment(payload);
    
    res.json(_model.output);
 
  },
  
  
 
 
 
 }
 
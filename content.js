
const express = require('express');
const content = express.Router();
const { checkingContentUrl } = require('./controller/content.js')

content.route('/user/cus_profile/v1/photo/:name').get((_req, res) => {
    
       res.sendFile(__dirname + `/media/user/image/${_req.params.name}`);

  });
  content.route('/user/cus_profile/v2/photo/:name').get((_req, res) => {
   
       res.sendFile(__dirname + `/media/user/images/${_req.params.name}`);

  });
  content.route('/grewtale/media/v1/photo/:name').get((_req, res) => {
    const query = _req.query;
    
    if(JSON.stringify(query) === '{}' || query.en_session === undefined || query.u_id === undefined || query.en_date === undefined || query.en_name === undefined){throw 'Bad URL hash.';}else{
   const r = checkingContentUrl(query.en_session, query.en_date, query.en_name, _req.params.name);
   if(r === true) {res.sendFile(__dirname + `/media/grewtales/images/${_req.params.name}` , 
   
   );}
     else{ throw r;}
    }
  });
  content.route('/grewtale/media/v1/videos/:name').get((_req, res) => {
    const query = _req.query;
    if(JSON.stringify(query) === '{}' || query.en_session === undefined || query.u_id === undefined || query.en_date === undefined || query.en_name === undefined){throw 'Bad URL hash.';}else{
    const r = checkingContentUrl(query.en_session, query.en_date, query.en_name, _req.params.name);
    if(r === true){ res.sendFile(__dirname + `/media/grewtales/videos/${_req.params.name}`); }else{
     throw r; }
    }

  });
  content.route('/grewtale/media/v1/thumbnails/:name').get((_req, res) => {
    const query = _req.query;
    if(JSON.stringify(query) === '{}' || query.en_session === undefined || query.u_id === undefined || query.en_date === undefined || query.en_name === undefined){throw 'Bad URL hash.';}else{
    const r = checkingContentUrl(query.en_session, query.en_date, query.en_name, _req.params.name);
    if(r === true) {res.sendFile(__dirname + `/media/grewtales/thumbnails/${_req.params.name}`);}else{
      throw r;}
    }

  });
  content.route('/comment/media/v1/photo/:name').get((_req, res) => {
     res.sendFile(__dirname + `/media/comments/images/${_req.params.name}`);

  });
  
  content.route('/chat/media/v1/audio/:name').get((_req, res) => {
     res.sendFile(__dirname + `/media/chat/audio/${_req.params.name}`);

  });
  content.route('/chat/media/v1/image/:name').get((_req, res) => {
    res.sendFile(__dirname + `/media/chat/image/${_req.params.name}`);

  });
  module.exports = content;
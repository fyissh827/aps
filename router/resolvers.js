//const { GraphQLJSON } = require('graphql-type-json');

//home get

const id_get = require('./modules/home/id_get.js');
const get_g = require('./modules/home/get_g.js');
const grewtaleContent = require('./modules/home/grewtaleContent.js');
const get_g_connection = require('./modules/home/get_g_connection.js');
const post = require('./modules/home/post.js');
const connectors_get = require('./modules/home/connectors_get');

//user get

const you = require('./modules/user/get_user.js')
const get_past = require('./modules/user/get_past');
const get_present = require('./modules/user/get_present');
const get_future = require('./modules/user/get_future');
const get_subject = require('./modules/user/get_subject');
const my_gt = require('./modules/user/grewtale_get.js');
const connector_user_get = require('./modules/user/connector_get.js');

//search

const user_s = require('./modules/search/user.js');
const grewtale_s = require('./modules/search/grewtale.js');
const past_s = require('./modules/search/past.js');
const present_s = require('./modules/search/present.js');
const future_s = require('./modules/search/future.js');
const subject_s = require('./modules/search/subject.js');

//alert


const alerts_get =  require('./modules/alerts/get');

//notification

const notification_get = require('./modules/notification/get1');
const notification_count = require('./modules/notification/notification_count');
//
const search_get = require('./modules/search_h/search_get');

//comment

const comment_get = require('./modules/global_comment/get.js');
const comment_get_type = require('./modules/global_comment/get_type.js');

//chat 

const chat_get = require('./modules/chat/get.js');
const chat_user_get = require('./modules/chat/getuser.js');
const chat_user_get_new = require('./modules/chat/getusernew.js');
const getsinglemsg = require('./modules/chat/getsingle.js');

//logger

const me = require('./modules/logger/me');

const {state} = require("./other/state.js");
const {count} = require("./modules/notification/model/index.js");

 //lifelineSingle
 const getLifelineSingle = require('./modules/singleLifeline/get.js');
 const getLifelineObjWithUser = require('./modules/singleLifeline/getLifelineObjWithUser.js');
  
 //Usermessagingrule

  const userMessagingRules = require('./modules/userMessagingRules/get.js')
//crawler


const crawler = require('./modules/crawler/index')

const Query = {
   getState : (...d) => {
    const r = state(d);
     return r;
   },
   getCount : async(...d) => {
    const payload = {
      user_id : d[2].userData.userId,
       alertSeen : d[1].alertSeen
    } 
    const r = await count(payload);
     return r;
   },
   //lifelineSingle
   //getLifelineObjWithUser : async(...d) =>{
    // console.log(d);
   // const payload = {objId : d[1].objId, objType : d[1].objType, user1 : d[2].userData.userId } 
    //const r = await getLifelineObjWithUser(payload);
    //  const f = YAML.stringify(r);
    // return f;
   //},
   getLifelineObjWithUser : async(...d) => {
    const payload = {objId : d[1].objId, objType : d[1].objType, user1 : d[2].userData.userId, user2 : d[1].user2} 
    const r = await getLifelineObjWithUser.process(payload);
    return r;
   },
   //userMessagingRules
   getMessagingRules : async(...d) => {
    const payload = {userId : d[1].userId} 
    const r = await userMessagingRules.get(payload);
     return r;
   },

   getChat: async(...d) => {
    const payload = {user2 : d[1].user2, next : d[1].next, length : d[1].length, user1 : d[2].userData.userId } 
    const r = await chat_get.process(payload);
      return r;
   }, // getChat(user2 : String!, next : Int, length : Int!) : JSON
   getChatUser: async(...d) => {
    const payload = {user : d[2].userData.userId, next : d[1].next, length : d[1].length } 
    const r = await chat_user_get.process(payload);
      return r;
   }, // getChatUser(next : Int, length : Int!) : JSON
   getChatUserNew: async(...d) => {
    const payload = {id : d[1].id } 
    const r = await chat_user_get_new.process(payload);
      return r;
   }, // getChatUserNew(id : String!) : JSON
   getSingleMessage: async(...d) => {
    const payload = {id : d[1].id } 
    const r = await getsinglemsg.process(payload);
      return r;
   }, // getSingleMessage(id : String!) : JSON

   //comment
   getComment: async(...d) => {
    const payload = {primitive_id : d[1].primitive_id, next : d[1].next, length : d[1].length } 
    const r = await comment_get.process(payload);
      return r;
   }, // getComment(primitive_id : String!, next : Int, length : Int!) : JSON
   getCommentByType: async(...d) => {
    const payload = {primitive_id : d[1].primitive_id, next : d[1].next, length : d[1].length, type : d[1].type } 
    const r = await comment_get_type.process(payload);
      return r;
   }, // getCommentByType(primitive_id : String!, next : Int, length : Int!, type : String) : JSON
   //searh_h
   getSearchHistory: async(...d) => {
    const payload = {user_id : d[2].userData.userId, items : 4, offset : 0 };
    console.log(payload);
    const r = await search_get.process(payload);
      return r;
   }, // getSearchHistory : JSON
    //alert 
    getAlert: async(...d) => {
      const payload = {next : d[1].next, length : d[1].length, id : d[2].userData.userId} 
      const r = await alerts_get.process(payload);
        return r;
     }, // getAlert(next : Int, length : Int!) : JSON
    //notification
    getNotification: async(...d) => {
      const payload = {next : d[1].next, length : d[1].length, id : d[2].userData.userId} 
      const r = await notification_get.process(payload);
        return r;
     }, // getNotification(next : Int, length : Int!) : JSON
     getNotificationCount: async(...d) => {
      const payload = {alertSeen : d[1].alertSeen, user_id : d[2].userData.userId} 
      const r = await notification_count.process(payload);
      console.log(r);
        return r;
     }, // getNotificationCount(alertSeen : String) : JSON
   //user
   getProfileUser: async(...d) => {
    const payload = {username : d[1].username, user_id : d[2].userData.userId} 
    
    const r = await you.process(payload);
      return r;
   }, // getProfileUser(username : String!) : JSON
   getProfileSubject: async(...d) => {
    const payload = {_m : d[1].username} 
    const r = await get_subject.process(payload);
      return r;
   }, // getProfileSubject(username : String!) : JSON
   getProfilePast: async(...d) => {
    const payload = {_m : d[1].username, next : d[1].next, length : d[1].length,user_id : d[2].userData.userId} 
    const r = await get_past.process(payload);
      return r;
   },// getProfilePast(username : String!, next : Int, length : Int!) : JSON
   getProfilePresent: async(...d) => {
    const payload = {_m : d[1].username, next : d[1].next, length : d[1].length,user_id : d[2].userData.userId}  
    const r = await get_present.process(payload);
      return r;
   },// getProfilePresent(username : String!, next : Int, length : Int!) : JSON
   getProfileFuture: async(...d) => {
    const payload = {_m : d[1].username, next : d[1].next, length : d[1].length,user_id : d[2].userData.userId} 
    const r = await get_future.process(payload);
      return r;
   },// getProfileFuture(username : String!, next : Int, length : Int!) : JSON
   getProfileGrewtale: async(...d) => {
    const payload = {_h : d[1].username, items : d[1].items, next : d[1].next, length : d[1].length,user_id : d[2].userData.userId}  
    const r = await my_gt.process(payload);
     return r;
   },// getProfileGrewtale(username : String!, items : Int, next : Int, length : Int!) : JSON
   getProfileConnector: async(...d) => {
    const payload = {id : d[1].id, next : d[1].next, length : d[1].length}  
    const r = await connector_user_get.process(payload);
      return r;
   },// getProfileConnector(id : String!, next : Int, length : Int!) : JSON


  
   // home 
   getPeopleSuggestion : async(...d) => {
    const payload = { next : d[1].next, length : d[1].length, user_id : d[2].userData.userId, id : d[1].id} 
    const r = await connectors_get.process(payload);
     return r;
   },
   getGrewtale : async(...d) => {
    const payload = {next : d[1].next,length : d[1].length,user_id : d[2].userData.userId} 
    const r = await get_g.process(payload);
      return r;
   },
   getGrewtaleConnection : async(...d) => {
    const payload = {user_id : d[2].userData.userId, next : d[1].next, length : d[1].length} 
    const r = await get_g_connection.process(payload);
      return r;
   },
   getGrewtaleById: async(...d) => {
    const payload = {id : d[1].id, user_id : d[2].userData.userId};
    console.log(payload); 
    const r = await post.process(payload);
      return r;
   }, //getGrewtaleById(next : Int, length : Int!, id : String!) : JSON
   getGrewtaleByPrimitiveId : async(...d) => {
    const payload = {length : d[1].length, items : d[1].items, user_id	: d[2].userData.userId, _p : d[1].p_id, next : d[1].next} ;
     const r = await id_get.process(payload);
      return r;
   }, //getGrewtaleByPrimitiveId(next : Int, length : Int!, p_id : String!, items : Int) : JSON
   getGrewtaleContent : async(...d) => {
    const payload = {id : d[1].id} 
    const r = await grewtaleContent.process(payload);
      return r;
   }, //getGrewtaleContent(id : String!) : JSON
    
   //search
   getSearchUser: async(...d) => {
    const payload = {_h : d[1].query, next : d[1].next, length : d[1].length,_m : d[2].userData.userId} 
    const r = await user_s.process(payload);
      return r;
   }, // getSearchUser(query : String!, next : Int, length : Int!) : JSON
   getSearchSubject: async(...d) => {
    const payload = {_h : d[1].query, next : d[1].next, length : d[1].length,_m : d[2].userData.userId} 
    const r = await subject_s.process(payload);
      return r;
   }, // getSearchSubject(query : String!, next : Int, length : Int!) : JSON
   getSearchPast: async(...d) => {
    const payload = {_h : d[1].query, next : d[1].next, length : d[1].length,_m : d[2].userData.userId} 
    const r = await past_s.process(payload);
      return r;
   },// getSearchPast(query : String!, next : Int, length : Int!) : JSON
   getSearchPresent: async(...d) => {
    const payload = {_h : d[1].query, next : d[1].next, length : d[1].length,_m : d[2].userData.userId} 
    const r = await present_s.process(payload);
      return r;
   },// getSearchPresent(query : String!, next : Int, length : Int!) : JSON
   getSearchFuture: async(...d) => {
    const payload = {_h : d[1].query, next : d[1].next, length : d[1].length,_m : d[2].userData.userId} 
    const r = await future_s.process(payload);
      return r;
   },// getSearchFuture(query : String!, next : Int, length : Int!) : JSON
   getSearchGrewtale: async(...d) => {
    const payload = {_h : d[1].query, next : d[1].next, length : d[1].length,_m : d[2].userData.userId} 
    const r = await grewtale_s.process(payload);
      return r;
   },// getSearchGrewtale(query : String!, next : Int, length : Int!) : JSON


  //logger

   getUser : async(...d) => {
    const payload = {id : d[2].userData.userId} 
    const r = await me.process(payload);
    console.log(r);
      return r;
  },
  //crawler
  getWebLinkData: async(...d) => {
    const url =  d[1].url;
    const r = await crawler.process(url);
      return r;
   },// getWebLinkData(url : String!) : JSON
  searchUser : async(...d) => {
    return [{
      "name" : "harshit",
      "class" : "5th"
    }];
  }
};



module.exports = {Query}
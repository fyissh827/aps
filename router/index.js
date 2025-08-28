const express = require('express');
const crypto = require('crypto');
var hash = crypto.createHash('sha256');
const router = express.Router();
const bodyParser = require('body-parser');
const userMiddleware = require('../middleware/index');
const picval2 = require('../middleware/picval2');
const multi = require('../middleware/multi');
const multi2 = require('../middleware/multi2');
const multi4 = require('../middleware/multi4');

//system
const jwtDecode = require('./modules/system/jwt'); 

//fs
const writeFile  = require('./modules/fs/writeFile');
//date

const year  = require('./modules/date/year');
const date  = require('./modules/date/date');

//registration

const login = require('./modules/registration/login');
const signup = require('./modules/registration/signup');

//edit

const edit = require('./modules/edit/editprofile');
const edit_dob = require('./modules/edit/editDob');
const editaddress = require('./modules/edit/editaddress');


//logger 

const me = require('./modules/logger/me');
const me_address = require('./modules/logger/me_address');

//profilepic
const set = require('./modules/profilepic/set');
const pic_update = require('./modules/profilepic/update');
const pic_remove = require('./modules/profilepic/delete');

//locations

const states = require('./modules/locations/states');
const country = require('./modules/locations/country');
const city  = require('./modules/locations/city');

//set lifeline&sub

const past = require('./modules/lifeline&sub/past');
const present = require('./modules/lifeline&sub/present');
const future = require('./modules/lifeline&sub/future');
const subject = require('./modules/lifeline&sub/subject');

//user get

const you = require('./modules/user/get_user.js')
const get_past = require('./modules/user/get_past');
const get_present = require('./modules/user/get_present');
const get_future = require('./modules/user/get_future');
const get_subject = require('./modules/user/get_subject');
const my_gt = require('./modules/user/grewtale_get.js');
const connector_user_get = require('./modules/user/connector_get.js');

const grewtale_delete = require('./modules/user/grewtale_delete.js');
const past_delete = require('./modules/user/past_delete.js');
const present_delete = require('./modules/user/present_delete.js');
const future_delete = require('./modules/user/future_delete.js');
const subject_delete = require('./modules/user/subject_delete.js');

//search_history

const search_history = require('./modules/search_h/search_history');
const search_get = require('./modules/search_h/search_get');


//posting

const grewtale = require('./modules/posting/grewtale');
const grewtaleplus = require('./modules/posting/grewtale_plus');


//global_comment

const comment = require('./modules/global_comment/comment.js');
const comment_get = require('./modules/global_comment/get.js');
const comment_get_type = require('./modules/global_comment/get_type.js');
const comment_delete = require('./modules/global_comment/delete.js');


//chat

const chat_put = require('./modules/chat/put.js');
const chat_seen = require('./modules/chat/seen.js');
const chat_delete = require('./modules/chat/delete.js');
const chat_count = require('./modules/chat/count.js');
const chat_get = require('./modules/chat/get.js');
const chat_user_get = require('./modules/chat/getuser.js');
const chat_user_get_new = require('./modules/chat/getusernew.js');
const getsinglemsg = require('./modules/chat/getsingle.js');



//search

const user_s = require('./modules/search/user.js');
const grewtale_s = require('./modules/search/grewtale.js');
const past_s = require('./modules/search/past.js');
const present_s = require('./modules/search/present.js');
const future_s = require('./modules/search/future.js');
const subject_s = require('./modules/search/subject.js');



// settings 

const st_privacy = require('./modules/settings/privacy.js');
const st_messaging = require('./modules/settings/messaging.js');
const st_messaging_rules = require('./modules/settings/messaging_rules.js');
const st_messaging_rules_delete = require('./modules/settings/messaging_rules_delete.js');
const st_search = require('./modules/settings/search.js');
const st_vibration = require('./modules/settings/vibration.js');
const st_sound = require('./modules/settings/sound.js');
const st_username = require('./modules/settings/user.js');
const st_email = require('./modules/settings/email.js');
const st_phone = require('./modules/settings/phone.js');
const get_st = require('./modules/settings/get.js');
const delete_search = require('./modules/settings/delete_search.js');
const delete_user = require('./modules/settings/delete_user.js');
const deactivate_user = require('./modules/settings/deactivate_user.js');
const password_check = require('./modules/settings/password_check.js');
const password_update = require('./modules/settings/password_update.js');


//home get

const id_get = require('./modules/home/id_get.js');
const get_g = require('./modules/home/get_g.js');
const grewtaleContent = require('./modules/home/grewtaleContent.js');
const get_g_connection = require('./modules/home/get_g_connection.js');
const post = require('./modules/home/post.js');
const connectors_get = require('./modules/home/connectors_get');
 
//plotter updates

const plotter_insert = require('./modules/plotter/insert');
const plotter_delete = require('./modules/plotter/delete');

//plotter lifeline updates

const plotter_past_insert = require('./modules/plotter_lifeline/past_insert');
const plotter_past_delete = require('./modules/plotter_lifeline/past_delete');

const plotter_present_insert = require('./modules/plotter_lifeline/present_insert');
const plotter_present_delete = require('./modules/plotter_lifeline/present_delete');

const plotter_future_insert = require('./modules/plotter_lifeline/future_insert');
const plotter_future_delete = require('./modules/plotter_lifeline/future_delete');

//connectors

const connectors_request = require('./modules/connector/request');
const connectors_accept = require('./modules/connector/accept');
const connectors_delete = require('./modules/connector/delete');
const connector_stop = require('./modules/notification/connector_stop');

//Report


const report_grewtale = require('./modules/report/grewtale');
const report_comment = require('./modules/report/comment');

//notification


const notification_get = require('./modules/notification/get1');
const notification_count = require('./modules/notification/notification_count');
const notification_count_destroyed = require('./modules/notification/notification_count_destroyed');

//
const alerts_get =  require('./modules/alerts/get');
const alert_seen_set = require('./modules/alerts/alertSeenSet');


//time

const tester = require('./modules/tester');

 //lifelineSingle
 const getLifelineSingle = require('./modules/singleLifeline/get.js');

 //messagingObjActions
 
 const messagingRequestAccept = require('./modules/messagingObjActions/accept.js');
 const messagingRequestDelete = require('./modules/messagingObjActions/delete.js');
 const messagingRequestSend = require('./modules/messagingObjActions/send.js');

//feedback

const feedback_s = require('./modules/feedback/feedback_s');
const feedback_u = require('./modules/feedback/feedback_u');
const feedback_g = require('./modules/feedback/feedback_g');

//real-time search
const realTimeSearch = require('./modules/realTimeSearch/index');


//testers
const test = require('./modules/test/index2');

//crawler

const crawler = require('./modules/crawler/index')

const app = express();
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());



  router.route('/check').get((_req, res) => {
	
	  var json =  {
		maintenance : false,
		crypto : {
			'nonce' : crypto.randomBytes(16).toString('base64'),
			
		},
		connected : true,
		status : 'online'
	}
    res.json(json);

  });


//system
router.route('/jwtdecode').get(jwtDecode.jwtDecode);


// Registration +m

router.route('/signup').post(signup.signup);
router.route('/login').post(login.login);


//Edit basic + m

router.route('/edit/profile').post( userMiddleware.isLoggedIn, edit.edit_profile );
router.route('/edit/address').post( userMiddleware.isLoggedIn, editaddress.edit_address );
router.route('/edit/dob').post(userMiddleware.isLoggedIn, edit_dob.edit_dob);



 // address & logger +m

router.route('/userprofile').get( me.me);
router.route('/userprofile/address').get(userMiddleware.isLoggedIn, me_address.me );


 
 // userprofile photo update +m

router.use('/api/user/cus_profile/v1/photo',  express.static('media/user/image'));
router.use('/api/user/cus_profile/v2/photo',  express.static('media/user/images'));
router.route('/upload/profilepic').post( picval2.upload.array('profile' , 20),  pic_update.profilepic);
router.route('/remove/profilepic').post(userMiddleware.isLoggedIn, pic_remove.remove );

//lifeline&sub +m

router.route('/insert/past').post(userMiddleware.isLoggedIn, past.past);
router.route('/insert/present').post(userMiddleware.isLoggedIn, present.present);
router.route('/insert/future').post(userMiddleware.isLoggedIn, future.future);
router.route('/insert/subject').post(userMiddleware.isLoggedIn, subject.subject);


// countries & ccities +m 

router.route('/country').get(country.country);
router.route('/state').post(states.states);
router.route('/city').post(city.city);

//date & time +m

router.route('/year').get(year.year);
router.route('/date').get(date.date);

// search history +m

router.route('/search/history/post').post(userMiddleware.isLoggedIn, search_history.search_history);
router.route('/search/history/get').get(userMiddleware.isLoggedIn, search_get.search_get);

// searching +m

router.route('/search/users').post(userMiddleware.isLoggedIn, user_s.user);
router.route('/search/grewtale').post(userMiddleware.isLoggedIn, grewtale_s.grewtale);
router.route('/search/past').post(userMiddleware.isLoggedIn, past_s.past);
router.route('/search/present').post(userMiddleware.isLoggedIn, present_s.present);
router.route('/search/future').post(userMiddleware.isLoggedIn, future_s.future);
router.route('/search/subject').post(userMiddleware.isLoggedIn, subject_s.subject);


// posting +m

router.use('/api/grewtale/media/v1/photo',  express.static('media/grewtales/images'));
router.route('/p/grewtale').post(grewtale.grewtale);
router.route('/p/grewtaleplus').post(grewtaleplus.grewtaleplus);

//comment +m

router.use('/api/comment/media/v1/photo',  express.static('media/comment/images'));
router.route('/p/comment').post(comment.comment);
router.route('/g/comment').post(comment_get.comment_get);
router.route('/g/comment/type').post(comment_get_type.comment_get_type);
router.route('/d/comment').post(comment_delete.comment_delete);

 //testing  +m 
 
router.route('/testing/files').post(userMiddleware.isLoggedIn,  grewtale.grewtale);
router.route('/testing/image').post(multi.upload.array('photos', 30));

//home +m

router.route('/connectors/get').post(userMiddleware.isLoggedIn, connectors_get.connectors_get);
router.route ('/get/grewtale').post(userMiddleware.isLoggedIn, get_g.grewtale);
router.route ('/get/grewtale/connection').post(userMiddleware.isLoggedIn, get_g_connection.grewtale);
router.route ('/get/last/post').post(userMiddleware.isLoggedIn, post.grewtale);
router.route ('/get/grewtale/p').post(userMiddleware.isLoggedIn, id_get.grewtale);
router.route('/grewtale/content/:id').get(grewtaleContent.grewtaleContent);

//user get + m

router.route('/profile').post(userMiddleware.isLoggedIn, you.you);
router.route ('/user/grewtale').post(userMiddleware.isLoggedIn, my_gt.grewtale);
router.route ('/user/connectors').post(connector_user_get.connector_user_get);
router.route('/get/past').post(userMiddleware.isLoggedIn, get_past.get_past);
router.route('/get/present').post(userMiddleware.isLoggedIn, get_present.get_present);
router.route('/get/future').post(userMiddleware.isLoggedIn, get_future.get_future);
router.route('/get/subject').post(userMiddleware.isLoggedIn, get_subject.get_subject);
router.route('/grewtale/delete').post(userMiddleware.isLoggedIn, grewtale_delete.grewtale_delete);
router.route('/past/delete').post(userMiddleware.isLoggedIn, past_delete.past_delete);
router.route('/present/delete').post(userMiddleware.isLoggedIn, present_delete.present_delete);
router.route('/future/delete').post(userMiddleware.isLoggedIn, future_delete.future_delete);
router.route('/subject/delete').post(userMiddleware.isLoggedIn, subject_delete.subject_delete);

//plotters route +m 

router.route('/plotter/inside').post(userMiddleware.isLoggedIn, plotter_insert.plotter_insert);
router.route('/plotter/remove').post(userMiddleware.isLoggedIn, plotter_delete.plotter_delete);

//plotters lifeline route + m

router.route('/past/plotter/inside').post(userMiddleware.isLoggedIn, plotter_past_insert.past_plotter_insert);
router.route('/past/plotter/remove').post(userMiddleware.isLoggedIn, plotter_past_delete.past_plotter_delete);

router.route('/present/plotter/inside').post(userMiddleware.isLoggedIn, plotter_present_insert.present_plotter_insert);
router.route('/present/plotter/remove').post(userMiddleware.isLoggedIn, plotter_present_delete.present_plotter_delete);

router.route('/future/plotter/inside').post(userMiddleware.isLoggedIn, plotter_future_insert.future_plotter_insert);
router.route('/future/plotter/remove').post(userMiddleware.isLoggedIn, plotter_future_delete.future_plotter_delete);

//connectors + m


router.route('/connectors/request').post(userMiddleware.isLoggedIn, connectors_request.connectors_request);
router.route('/connectors/accept').post(userMiddleware.isLoggedIn, connectors_accept.connectors_accept);
router.route('/connectors/delete').post(userMiddleware.isLoggedIn, connectors_delete.connectors_delete);

//Report

router.route('/report/grewtale').post(userMiddleware.isLoggedIn, report_grewtale.report_grewtale);
router.route('/report/comment').post(userMiddleware.isLoggedIn, report_comment.report_comment);



//notification + m


router.route('/notification/get1').post(userMiddleware.isLoggedIn, notification_get.notification_get);

router.route('/notification/remove1').post(userMiddleware.isLoggedIn, connector_stop.connector_stop);
router.route('/notification/count').post(userMiddleware.isLoggedIn, notification_count.notification_count);
router.route('/notification/count/destroyed').post(userMiddleware.isLoggedIn, notification_count_destroyed.notification_count_destroyed);


//alerts

router.route('/alert/get').post(userMiddleware.isLoggedIn, alerts_get.alerts_get);
router.route('/alert/seen/set').post(userMiddleware.isLoggedIn, alert_seen_set.alert_seen_set);


//chat



router.route('/chat/message/put').post(chat_put.chat_put);
router.route('/chat/message/seen').post(chat_seen.chat_seen);
router.route('/chat/message/delete').post(chat_delete.chat_delete);
router.route('/chat/message/get').post(userMiddleware.isLoggedIn, chat_get.chat_get);
router.route('/chat/message/count').post(chat_count.chat_count);
router.route('/chat/message/user').post(userMiddleware.isLoggedIn, chat_user_get.chat_user_get);
router.route('/chat/message/user/new').post(userMiddleware.isLoggedIn, chat_user_get_new.chat_user_get_new);
router.route('/chat/message/single').post(getsinglemsg.getsinglemsg);



//settings + m

router.route('/setting/privacy').post(userMiddleware.isLoggedIn, st_privacy.privacy);
router.route('/setting/messaging').post(userMiddleware.isLoggedIn, st_messaging.messaging);
router.route('/setting/messaging/rules').post(userMiddleware.isLoggedIn, st_messaging_rules.messaging_rules);
router.route('/setting/messaging/rules/delete').post(userMiddleware.isLoggedIn, st_messaging_rules_delete.messaging_rules_delete);
router.route('/setting/search').post(userMiddleware.isLoggedIn, st_search.search);
router.route('/setting/sound').post(userMiddleware.isLoggedIn, st_sound.sound);
router.route('/setting/vibration').post(userMiddleware.isLoggedIn, st_vibration.vibration);
router.route('/setting/username').post(userMiddleware.isLoggedIn, st_username.username);
router.route('/setting/email').post(userMiddleware.isLoggedIn, st_email.email);
router.route('/setting/phone').post(userMiddleware.isLoggedIn, st_phone.phone);
router.route('/setting/delete/search').post(userMiddleware.isLoggedIn, delete_search._delete);
router.route('/setting/deactivate/account').post(userMiddleware.isLoggedIn, deactivate_user._deactivate);
router.route('/setting/delete/account').post(userMiddleware.isLoggedIn, delete_user._delete);
router.route('/setting/get').get(userMiddleware.isLoggedIn, get_st.get);
router.route('/setting/password/check').post(userMiddleware.isLoggedIn, password_check.password_check);
router.route('/setting/password/update').post(userMiddleware.isLoggedIn, password_update.password_update);

//fs
router.route('/fs/writeFile').post(writeFile.writeFile);

//Feedback model + m
 
 router.route('/feedback/s').post(feedback_s.feedback);
 router.route('/feedback/u').post(feedback_u.feedback);
 router.route('/feedback/g').post(feedback_g.feedback);

 //real-time search
 
 router.route('/realtimesearch').post(realTimeSearch.realTimeSearch);

  //messagingObjActions
  
  router.route('/messagingRequest/accept').post( messagingRequestAccept.messagingRequestAccept);
  router.route('/messagingRequest/delete').post( messagingRequestDelete.messagingRequestDelete);
  router.route('/messagingRequest/send').post(userMiddleware.isLoggedIn, messagingRequestSend.messagingRequestSend);
  

 //testers
 
 router.route('/test').get(test.test);
  
 //lifelineSingle

 router.route('/lifeline/single').post(userMiddleware.isLoggedIn, getLifelineSingle.getLifelineSingle);

 //crawler

 router.route('/crawler').get(crawler.crawler);

module.exports = router;
 
 
 
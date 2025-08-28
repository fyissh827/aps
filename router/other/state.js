const crypto = require('crypto');
//var hash = crypto.createHash('sha256');
function state (d) {
	var  url = d[2].headers.host,
	 type = url.includes(":");
	 var api =null;
	 var cdn = null;
	 var chat = null;
     [api, cdn, chat] = type === true ? ["http://localhost:3000/", "http://localhost:3003/", "http://localhost:3002/"] : ["https://api.fyish.com/", "https://content.fyish.com/", "https://rtl.fyish.com/"];
	    var value =  {
		maintenance : false,
		crypto : {
			'nonce' : crypto.randomBytes(16).toString('base64'),
			
		},
		connected : true,
		status : 'online',
		links : {
			api:{base : api},
			"3rdParty" : {
				gifs : "https://media.tenor.com/",
				stickers : "https://img.stipop.io/"
			},
			cdn : {base : cdn, userprofile : {
				v1 : "user/cus_profile/v1/photo/", v2 : "user/cus_profile/v2/photo/"
			},
		grewtale : {
			image : "/grewtale/media/v1/photo/",
			video : {
				base : "/grewtale/media/v1/videos/",
				thumbnail : "/grewtale/media/v1/thumbnails/"
			},
			
		},
	   chat : {
		   image : "/chat/media/v1/image/",
		   audio : "/chat/media/v1/audio/",
		   
	   },
	   comment : {
		   image : "/comment/media/v1/photo/"
	   },
	   
	},
			chat : {base : chat},
		},
		
	}
    return value;
};
module.exports = {
    state
}
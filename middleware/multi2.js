const path = require('path');
const multer = require('multer');

module.exports = {

upload :  multer({
	storage :  multer.diskStorage({
		
			destination :(req, file, cb) => {
				
                    return  cb(null, './media/comments/images')
				
			},
	filename : (req, file, cb) => {
		var extention = file.mimetype.split('/')[1];
		return cb(null, `${req.userData.userId}ASB_8989_${Date.now()}.${extention}`)
	}
	}),	})};
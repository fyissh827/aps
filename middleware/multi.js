const path = require('path');
const multer = require('multer');

module.exports = {

upload :  multer({
	storage :  multer.diskStorage({
		
			destination :(req, file, cb) => {
			
				if(file.mimetype === 'video/mp4'){
                    return  cb(null, './media/grewtales/videos')
				}else{
					if(file.originalname === 'thumbnails'){
						return  cb(null, './media/grewtales/thumbnails')
					}else{
                        return  cb(null, './media/grewtales/images')
					}
				}
			},
			
	filename : (req, file, cb) => {
		var extention = file.mimetype.split('/')[1]; 
		return cb(null, `${req.userData.userId}ASB_5454_${Date.now()}.${extention}`)
	}
	}),	})};
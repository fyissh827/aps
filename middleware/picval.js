const path = require('path');
const multer = require('multer');

module.exports = {

upload :  multer({
	
	storage :  multer.diskStorage({
	destination : './media/user/image',
	filename2 : (req, file, cb) => {
		return cb(null, `${req.userData.userId}_4545_${Date.now()}${path.extname(file.originalname)}`);
		//console.log(req.body.name);
	},

}),	
}),
};
const path = require('path');
const multer = require('multer');
const _time = Date.now();
const random = Math.round(Math.random());
module.exports = {
  upload: multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        if (file.originalname === '1') {
          return cb(null, './media/user/images');
        } else {
          return cb(null, './media/user/image');
        }
      },

      filename: (req, file, cb) => {
        var extention = file.mimetype.split('/')[1];
        return cb(
          null,
          `${req.userData.userId}ASB_${random}_${_time}.${extention}`
        );
      },
    }),
  }),
};

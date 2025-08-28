const jwt_decode = require('jwt-decode');

module.exports = {

async jwtDecode (req, res, next) {
	q = req.query.q;
    var decoded = jwt_decode(q);

    console.log(decoded);
     res.json(decoded);
 }
}
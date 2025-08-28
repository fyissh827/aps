const Model = require('./model/index');
module.exports = {

async future(req, res){
const payload = {
	_m : req.userData.userId,
	_h : req.body.name,
	_g : req.body.type,
	date_1st : req.body.date1st,
    date_2nd : req.body.date2nd,
	date_type : req.body.dateType,
    location : req.body.location,
    try : req.body.try
};
const _model = await  Model.future(payload);
res.json(_model.output);
}
}
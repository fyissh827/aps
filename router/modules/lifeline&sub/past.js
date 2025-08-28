const Model = require('./model/index');
module.exports = {

async past (req, res){
const payload = {
	_m : req.userData.userId,
	_h : req.body.name,
	_g : req.body.type,
	date_1st : req.body.date1st,
    date_2nd : req.body.date2nd,
    date_type : req.body.dateType,
    location : req.body.location,
    try : req.body.try,
    how : req.body.how,
    story : req.body.story,
};
console.log(payload);
const _model = await  Model.past(payload);
res.json(_model.output);
}
}
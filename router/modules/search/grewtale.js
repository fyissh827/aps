const Model = require('./model/index');
const date = require('date-and-time');
const  hashing = require("../../../managers/hashing.js");
const {nextFormation} = require('../../../managers/process');

module.exports = {
	async  grewtale (req, res) {
		const payload = {
			_h: req.body.query,
			length: req.body.length,
			_m: req.userData.userId,
			next  : req.body.next
		};
		
		const r = await process(payload);
	res.json(r);
},
async process(d){return process(d)}
};
async function process(payload){
	const _model = await  Model.grewtales(payload);
   
   const data = _model.output;
		
		if (data === undefined) {
				var ac = {
					content_ob: 'nothing'
				}
			} else if (data.length === 0) {
				ac = {
					content_ob: 'nothing'
				}
			} else {
				var content_ob = [];
				for (var i = 0; i < data.length; i++) {
					var id = data[i].id;
					var title = data[i].title;
					var w_n = data[i].w_n;
					var file_type = data[i].file_type;
					var type = data[i].type;
					var content = data[i].content.slice(0, 30);
					var primitive_id = data[i].primitive_id;
					var created_at = data[i].created_at;
					var _date = date.format(created_at, 'ddd, MM-DD-YYYY');
					var obj = data[i].file;
					var file = JSON.parse(obj);
					var who = data[i].who;
					content_ob.push({
						id: id,
						title: title,
						w_n : w_n,
						type : type,
						content: content,
						primitive_id: primitive_id,
						created_at: _date,
						file_type: file_type,
						file: file,
						who: who
					});
				};
				 ac = {data : content_ob,
				       next : nextFormation(content_ob, payload)}
				
			}
	 return ac;
  }
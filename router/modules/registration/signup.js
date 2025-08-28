const con = require("../../../database/index.js"),
	bcrypt = require("bcrypt"),
	Joi = require("joi"),
	path = require("path"),
	Model = require("./model/index"),
	jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const {
	registerUser: registerUser
} = require("../../../redis/");
const { doesNotReject } = require("assert");
const {setReturnData} =  require("../../../managers/hashing");
const { date } = require("joi");
module.exports = {
	async signup(e, r) {
		
		if ("Self" === e.query.request) {
			let o = Joi.object({
				password: Joi.string().min(8).max(20).pattern(new RegExp("[A-Z0-9@$%&]")),
				first_name: Joi.string().min(2).max(15).required(),
				last_name: Joi.string().min(2).max(15).required(),
				email: Joi.string().email({
					minDomainSegments: 2,
					tlds: {
						allow: ["com", "net"]
					}
				}),
				year: Joi.number().integer().min(1950).max(2009).required(),
				month: Joi.number().required(),
				date: Joi.number().required(),
				origin: Joi.number().required(),
        verified: Joi.number().required()
			}).validate(e.body);
			if (o.error) {
				var i = o.error.details[0].message;
				return void r.json({
					msg: i
				})
			}
		}
		const o = {
				password: e.body.password,
				first_name: e.body.first_name,
				last_name: e.body.last_name,
				email: e.body.email,
				year: e.body.year,
				month: e.body.month,
				date: e.body.date
			},
			t = (await Model.login(o)).output;
		
		if ("Nothing" !== t && "Self" !== e.query.request){ r.json({
			msg: "login",
			type : "login",
			token: jwt.sign({
				email: o.email,
				userId: t[0].id
			}, "SECRETKEY", {
				expiresIn: "60d"
			}),
			access : setReturnData(o, t, e.query.request)
		})} else if((t !== 'Nothing' || t === 'Error') && 'Self' === e.query.request){ r.json({
			msg: "This email is already in use!"
		})}
		else {
			
			 p='Self'===e.query.request?doesNotReject():''
			 function doesNotReject(){
				
				var i = bcrypt.genSaltSync(10);
				 return bcrypt.hashSync(o.password, i);
			 }
				t1 = {
					password: p,
					first_name: e.body.first_name,
					last_name: e.body.last_name,
					email: e.body.email,
					year: e.body.year,
					month: e.body.month,
					date: e.body.date,
					origin: e.body.origin,
                   verified :  e.body.verified
				},
				
				a = (await Model.signup(t1)).output;
				
			if ("Nothing" === a) r.json({
				true_msg: !1,
				msg: a,
				type : "Registration"
			});
			else { 
				delete o.password; 
				delete o.year; 
				delete o.month; 
				delete o.date, 
				o.username = a.username,
				 o.id = a.id, 
				 phone = null,
				  o.profilepic = "1.svg",
				   o.status = 0;
				!0 === await registerUser(o) ? r.json({
					true_msg: !0,
					msg: "login",
					type : "Registration",
					
			token: jwt.sign({
				email: o.email,
				userId: a.id
			}, "SECRETKEY", {
				expiresIn: "60d"
			}),
			access : setReturnData(t1, a, e.query.request)
					
				}) : r.json({
					msg: "Error"
				})
				
			}
		}
	}
};
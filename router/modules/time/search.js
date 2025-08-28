const date = require('date-and-time');
module.exports = {

timeSettingOne :(ob) => {
var data = [];

for(var i = 0; i < ob.length; i++){
 
 var fields = {
	 first_name : ob[i].first_name,
	            id : ob[i].id,
			   last_name : ob[i].last_name,
			   profilepic : ob[i].profilepic,
			   username : ob[i].username,
			   name : ob[i].name,
			   type : ob[i].type,
			   file : ob[i].file,
			   file_type : ob[i].file_type,
			   date1st : ob[i].date_1st,
			   date2nd : ob[i].date_2nd,
			   dateType : ob[i].date_type,
			   location : ob[i].location,
			   how : ob[i].how === undefined ? undefined : ob[i].how,
			   try : ob[i].try,
			   story : ob[i].story === undefined ? undefined : ob[i].story,
			   _date : date.format(ob[i].created_at, 'ddd, DD-MM-YYYY'),
 };
  
  data.push({
			id : fields.id,
			first_name : fields.first_name,
			last_name : fields.last_name,
			profilepic : fields.profilepic,
			username : fields.username,
			name : fields.name,
			type : fields.type,
			file : fields.file,
			file_type : fields.file_type,
			date1st : fields.date1st,
			date2nd : fields.date2nd,
			dateType : fields.dateType,
			location : fields.location,
			how : fields.how,
			try : fields.try,
			story : fields.story,
			created_at : fields._date
			
		})

};
 return data;
	
},
timeSettingTwo :(ob) => {
	var data = [];

	for(var i = 0; i < ob.length; i++){
	 
	 var fields = {
		 first_name : ob[i].first_name,
				   last_name : ob[i].last_name,
				   profilepic : ob[i].profilepic,
				   username : ob[i].username,
				   name : ob[i].name,
				   meaning : ob[i].meaning,
				   type : ob[i].type,
				   file : ob[i].file,
				   file_type : ob[i].file_type,
				   _date : date.format(ob[i].created_at, 'ddd, DD-MM-YYYY'),
	 };
	  
	  data.push({
				id : fields.id,
				first_name : fields.first_name,
				last_name : fields.last_name,
				profilepic : fields.profilepic,
				username : fields.username,
				name : fields.name,
				meaning : fields.meaning,
				type : fields.type,
				file : fields.file,
				file_type : fields.file_type,
				created_at : fields._date
				
			})
	
	};
	return data;
		
	}
}
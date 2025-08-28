let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
//const con = require('./database/index.js');



http.listen(3001, () => {
    console.log('Listening on port *: 3000');
});
var users =[];
var id = 0;


io.on("connection", (socket) => {
socket.emit('Success', {messages : 'you are success fully connected'})

socket.on("privatemessage1", ({ content, too, send }) => {
	 socket.to(too).emit("successmessage", {
    content,
    from : socket.id
  });
 console.log(too)
});



socket.on("play", (socket) => {
	//let sql = `UPDATE users SET online = '1' WHERE id = '${username.username}'`
	//con.query(sql , function(err , result){
	//  if(result){
	//	  console.log('final')
	//  }	
	//});
	//socket.auth = username.username ;
	//console.log(socket);
   //  socket.broadcast.emit("connected", {
   //   dId: socket.auth
//});
console.log(socket);
});
  
  
socket.on("disconnect", () => {
	
socket.broadcast.emit("disconnected", {
      dId: socket.auth
    
	  
});
 
});


socket.on("user", (username) =>{
	     socket.auth = username.username ;
	     users.push({
		    userID : socket.id,
		    id : id++,
		    username : username.username,
		    profilepic : username.profilepic,
		    messages : [],
	       connected : true
		  });
	  
	   
	   
	   socket.broadcast.emit("userconnected", {
      userID: socket.id,
      username: username.username,
	  profilepic : username.profilepic,
	  first_name : username.first_name,
	  last_name : username.last_name,
	  messages : [],
	  connected : true
  });
  
  
});



		 

});
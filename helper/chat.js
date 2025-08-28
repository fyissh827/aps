const { callbackify } = require('util');

let httpServer = require('http').Server();
const io = require("socket.io")(httpServer, {
	cors: {
	  origin: "http://192.168.43.252:8080",
	},
 });
  

  httpServer.listen(3000, () => {
    console.log('Listening on port *: 3000');
});

const array = [];

io.on("connection",  (socket) => {
	
	
	socket.on('forming', (data) => {
		
      const payload = {'username' : data.username, id : socket.id};
	  var push = true;
	  
	  for(var i = 0; i < array.length; i++){
		  if(data.username === array[i].username){
			  push = false;
			  array[i].id = socket.id;
			  break;
		  }
	  }
      if(push === true){
		array.push(payload);
	  };
	 
     socket.broadcast.emit('user_connect', payload);
	 //callback({array});
	});


    socket.on('onmessage', data => {
        socket.to(data.reciever).emit('message_get', 
		
		 {
			 message : data.message,
			 from : socket.id
		 })
	});

	socket.on('disconnect', data =>{
		var  data = socket.id;
		socket.broadcast.emit('user_disconnected', data);
	
	});
  
});
const client = require('../database/redis.js'); 

module.exports = {
    async registerUser(data){
       
     
         
        const value = await client.sendCommand(['HMSET', `u:id:${data.id}`, `1`, `${data.first_name}`, '2', `${data.last_name}`,  '3', `${data.id}`,  '4', `${data.username}`,  '5', `${data.profilepic}`,  '6', `${data.email}`, '7', `${data.status}`]);
   
         if(value == "OK"){
             var msg = true
        }else{
            msg = 'Error'
        };
        return  msg;
        },
    async SetUserData(data){
       
    var b ={
        'first_name' : data.first_name,
        'last_name' : data.last_name,
        'id' : data.id,
        'profilepic' : data.profilepic,
        'status' : data.b_status,
        'username' : data.username,
        'email' : data.email,

    }
     
    const value = await client.sendCommand(['HMSET', `u:id:${data.id}`, `1`, `${data.first_name}`, '2', `${data.last_name}`,  '3', `${data.id}`,  '4', `${data.username}`,  '5', `${data.profilepic}`,  '6', `${data.email}`, '7', `${data.b_status}`]);
   
     if(value == "OK"){
         var msg = true
    }else{
        msg = 'Error'
    };
    return  msg;
    },
    async getUser(data){
        // const pipeline = client.pipeline();
        try{
        var value = await client.multi().json.numIncrBy(`user:${data}`, 'visitingCount', '1').json.get(`user:${data}`).exec();
        }
        catch(e){
         value = 'Error';
        
        }
        return value;
    },
    async updateUserSingle(a, b, c){
       //a = user:id, b = dataname, c = dataValue
        var output = '';
         var u = ['first_name', 'last_name', 'id', 'username', 'profilepic', 'email', 'status'];
       
            var t = u.indexOf(b);
            //console.log(t, a, c);
            var value = await client.hSet(`u:id:${a}`, `${t + 1}`, `${c}`);
             console.log(value);
            
           
            if(value == '0')output = 'OK'
            else output = 'Error'
           
            return output;
    },
    async getOtherUser(a){
        try{
            var value = await client.json.set(`user:${a}`);
            }
            catch(e){
             value = 'Error'
            }
            return value;
    }
}
var CryptoJS = require("crypto-js");
var atob = require("atob");


  function checkingContentUrl(a, b, c, d){
 try{
    var f = decodeURIComponent(b);
   var bytesb  = CryptoJS.AES.decrypt(f  , 'Secret Passphrase');
    var bo = bytesb.toString(CryptoJS.enc.Utf8);
    var p = atob(decodeURIComponent(c))
 }catch(e){
   var _final = 'enc'
 }   
 if(_final !== 'enc' && bo !== ''){
    if(a !== 'APQsr01olxtYNPQpsCBPNrfgmno==' || p !== d){
      var final = 'URL signature mismatch'
    }else if((Date.now() - bo) > 20000000){
       final = 'Url validity expire'
    }
    else{
       final = true;
    }
}else{
   final = 'URL signature mismatch'
}  
   
     return  final ;
}
module.exports = { checkingContentUrl }
 


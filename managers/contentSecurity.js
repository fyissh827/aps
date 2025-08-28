
const helmet = require("helmet");

const trusted = [
  "'self'",
];


  trusted.push('http://localhost:*', 'ws://localhost:*');



module.exports = {  contentSecurityPolicy(nonce) {
  return helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [
        "'self'",
       'https://accounts.google.com/',
               
      ],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
       'https://accounts.google.com/gsi/client',
        '*.google.com'
        
        
      ],
      connectSrc : [
        "'self'",
        'https://accounts.google.com/gsi/',
        '*.google.com',
        'https://lh3.googleusercontent.com/a-/',
        'https://*'
        
      ],
      frameSrc: [
        "'self'",
        'https://accounts.google.com/gsi/',
        '*.google.com'
      
      ],
      styleSrc:[
        "'self'",
        "'unsafe-inline'",
        'https://accounts.google.com/gsi/style',
        '*.google.com'
      ],
      imgSrc:[
        "'self'",
        'www.googletagmananger.com',
        'https://lh3.googleusercontent.com',
        'https://*',
        
      ],
      fontSrc:[
        "'self'",
        '*.cloudflare.com',
        '*.gstatic.com'
      ],
      frameAncestors:[
        "'self'",
        'http://localhost:8080',
        'http://localhost:*',
        'https://www.fyish.com',
        'https://*.fyish.com'
      ]
    },
   
   });
},
}
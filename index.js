const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
//const helmet = require('helmet');
const crypto = require('crypto');
const router = require('./router/index.js');
const content = require('./content.js');
const { createLightship } = require('lightship');
const bunyanMiddleware = require('bunyan-middleware');
const { logger, bunyan } = require('./helper/logger');
const userMiddleware = require('./middleware/index');
const redisSignin = require('./redisClass/signupCredentials');
const cluster = require('cluster');
const os = require('os');
const lightship = createLightship();
// set up port
const PORT = process.env.PORT || 3000;
var { contentSecurityPolicy } = require('./managers/contentSecurity.js');
let nonce = crypto.randomBytes(16).toString('base64');
const cookieParser = require("cookie-parser");
app.use(contentSecurityPolicy(nonce));
//require('./kafka/producer/profileUpdateUsername.js');
const con = require('./database/index.js');

const allowedDomains = [
  "https://fyish.com",
  "https://www.fyish.com"
];

const corsOptions = {
  origin: function (origin, callback) {

    if (!origin) return callback(null, true);

    if (origin.startsWith("http://localhost")) {
      return callback(null, true);
    }

    if (allowedDomains.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(
  bunyanMiddleware({
    headerName: 'X-Request-Id',
    propertyName: 'reqId',
    logName: 'reqId',
    obscureHeaders: ['authorization'],
    logger,
    additionalRequestFinishData: (_req, _res) => {
      return {};
    },
  })
);

app.use(cookieParser());  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const fs = require('fs');
const typeDefs = fs.readFileSync('./router/schema.graphql', {
  encoding: 'utf-8',
});
const resolvers = require('./router/resolvers');

const { makeExecutableSchema } = require('graphql-tools');
const schema = makeExecutableSchema({ typeDefs, resolvers });
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { signature } = require('./service/encode.js');
const { otp } = require('./service/otp.js');
app.use('/env',  (req, res) =>{
  res.json({
    status : process.env
  })
})
app.use('/health',  (req, res) =>{
  res.json({
    status : 200,
    message : "working correctly"
  })
})
app.use('/healthdb',  async(req, res) =>{
  try{
   const [row, fields] = await con.execute(
      `SELECT 1 FROM users`
    );
  res.json({
    data : row,
    
  })
  }catch(e){
    res.json({
    'Error' : e
    
  })
  }
  
})
app.use('/graphql/', userMiddleware.isLoggedInGraphql, (req, res) =>
  graphqlExpress({ schema, endpointURL: '/graphql/', context: req })(req, res)
);
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql/' }));

app.route('/api1').get((_req, res) => {
  res.send('Centrals APIS');
});
app.route('/google/Login/credentials').get((_req, res) => {
  res.sendFile(__dirname + '/router/googleOauth.html');
});


  app.use('', router);
 app.use('', content);
 app.route('/:dir').get((_req, res) => {
  res.sendFile(__dirname + `/yamls/${_req.params.dir}`);

});
app.use('',  async(req, res) =>{


  const {text} = req.query;
  const key = await signature(text);
  console.log(key);
  const _otp = await otp();
  const r  = await redisSignin.put(key, _otp, {
    "name" : "harshit",
    "class" : "12th"
  })
  res.send(await redisSignin.get(key, _otp, r));
})
require('./kafka/index.js');
app.listen(PORT, '0.0.0.0', () => lightship.signalReady());

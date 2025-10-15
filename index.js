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
const cluster = require('cluster');
const os = require('os');
const lightship = createLightship();
// set up port
const PORT = process.env.PORT || 3000;
var { contentSecurityPolicy } = require('./managers/contentSecurity.js');
let nonce = crypto.randomBytes(16).toString('base64');
app.use(contentSecurityPolicy(nonce));

app.use(cors());
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

app.use('/health',  (req, res) =>{
  res.json("ok harshi ok.   best of luck love you")
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
app.route('/:dir').get((_req, res) => {
  res.sendFile(__dirname + `/yamls/${_req.params.dir}`);

});
app.use('', express.static('router/dist'));
  app.use('', router);
 app.use('', content);
app.use('',  (req, res) =>{
  res.send("centrals APIs")
})
app.listen(PORT, '0.0.0.0', () => lightship.signalReady());

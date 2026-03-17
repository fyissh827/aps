const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');
const router = require('./router/index.js');
const content = require('./content.js');
const { createLightship } = require('lightship');
const userMiddleware = require('./middleware/index');
const redisSignin = require('./redisClass/signupCredentials');
const cluster = require('cluster');
const os = require('os');
const client = require("prom-client");
const lightship = createLightship();
const cookieParser = require("cookie-parser");

const requestLogger = require("./logger/requestLogger");
const logger = require("./logger/logger");

const PORT = process.env.PORT || 3000;

var { contentSecurityPolicy } = require('./managers/contentSecurity.js');
let nonce = crypto.randomBytes(16).toString('base64');

app.use(contentSecurityPolicy(nonce));

const con = require('./database/index.js');

const allowedDomains = [
  "https://fyish.com",
  "https://www.fyish.com"
];

app.use(cors({
  origin: (origin, callback) => {

    if (!origin) return callback(null, true);

    if (origin.startsWith("http://localhost")) {
      return callback(null, true);
    }

    if (allowedDomains.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("CORS not allowed"));
  },
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization","X-Requested-With","X-Location"]
}));


/* ---------------- LOGGER ---------------- */

app.use(requestLogger);

process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", err.stack);
});

process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Rejection:", err);
});

/* ---------------- LOGGER END ---------------- */

app.use(cookieParser());  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/* ---------------- PROMETHEUS ---------------- */

// -----------------------------
// 1. Default Metrics
// -----------------------------
client.collectDefaultMetrics({ timeout: 5000 });

// -----------------------------
// 2. CPU Usage Gauge
// -----------------------------
const cpuUsageGauge = new client.Gauge({
  name: 'node_process_cpu_usage_seconds_total',
  help: 'Total user and system CPU time spent in seconds'
});

setInterval(() => {
  const cpuUsage = process.cpuUsage();
  cpuUsageGauge.set((cpuUsage.user + cpuUsage.system) / 1e6); // μs → seconds
}, 5000);

// -----------------------------
// 3. HTTP Request Counter (Throughput)
// -----------------------------
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests received'
});

// -----------------------------
// 4. HTTP Latency Histogram
// -----------------------------
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 1, 2, 5]
});

// -----------------------------
// 5. Middleware for Metrics
// -----------------------------
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();

  // Increment throughput counter
  httpRequestCounter.inc();

  res.on('finish', () => {
    end({
      method: req.method,
      route: req.path,
      status_code: res.statusCode
    });
  });

  next();
});

/* ---------------- PROMETHEUS END ---------------- */


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


/* ---------------- BASIC ROUTES ---------------- */

app.get("/", (req, res) => {
  logger.info('Home route accessed');
  res.json("hello World.");
});

app.get('/slow', async (req, res) => {
  // simulate slow request
  setTimeout(() => {
    res.send('Slow response');
  }, 1000);
});

app.get("/metrics", async (req, res) => {
  try{
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
  }catch(e){
    res.json(e);
  }
});


app.use('/env', (req, res) =>{
  res.json({
    status : process.env
  })
})

app.use('/health', (req, res) =>{
  res.json({
    status : 200,
    message : "working correctly"
  })
})

app.use('/healthdb', async(req, res) =>{
  try{

    const [row, fields] = await con.execute(
      `SELECT 1 FROM users ORDER BY 1 LIMIT 1`
    );

    res.json(row)

  }catch(e){

    res.json({
      'Error' : e
    })

  }

})


/* ---------------- GRAPHQL ---------------- */

app.use('/graphql/', userMiddleware.isLoggedInGraphql, (req, res) =>
  graphqlExpress({ schema, endpointURL: '/graphql/', context: req })(req, res)
);

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql/' }));


/* ---------------- API ROUTES ---------------- */

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


/* ---------------- REDIS TEST ---------------- */

app.use('', async(req, res) =>{

  const {text} = req.query;

  const key = await signature(text);

  console.log(key);

  const _otp = await otp();

  const r = await redisSignin.put(key, _otp, {
    "name" : "harshit",
    "class" : "12th"
  })

  res.send(await redisSignin.get(key, _otp, r));

})


/* ---------------- KAFKA ---------------- */

require('./kafka/index.js');


/* ---------------- SERVER ---------------- */

app.listen(PORT, '0.0.0.0', () => {
  lightship.signalReady();
});
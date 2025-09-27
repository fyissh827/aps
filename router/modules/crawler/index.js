const getMetaData = require('metadata-scraper');
var CryptoJS = require('crypto-js');
module.exports = {
  async crawler(req, res) {
    const url = req.query.url;
    const r = await process(url);
    res.json(r);
  },
  async process(d) {
    return process(d);
  },
};
async function process(url) {
  const options = {
    url: url,
    maxRedirects: 5, // Maximum number of redirects to follow (default: 5)
    timeout: 1000, // Request timeout in milliseconds (default: 10000ms)
    forceImageHttps: false,
  };
  var r = null;
  await getMetaData(options)
    .then((data) => {
      var i = data.image;
      var ciphertext = CryptoJS.AES.encrypt(i, 'BELL_TONIGHT_827').toString();
      if (i) {
        data.image = encodeURIComponent(ciphertext);
      }
      r = data;
    })
    .catch((e) => {
      r = 'Error';
    });

  return r;
}

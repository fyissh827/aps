module.exports = {
  async set(req, res) {
    const actual = req.body.name;
    console.log(actual);
  },
};

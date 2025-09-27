const Model = require('./model/index');

module.exports = {
  async notification_count(req, res) {
    const payload = {
      user_id: req.userData.userId,
      alertSeen: req.body.alertSeen,
    };
    const r = await process(payload);
    res.json(r);
  },
  async process(d) {
    return process(d);
  },
};
async function process(payload) {
  const { output } = await Model.count(payload);
  return output;
}

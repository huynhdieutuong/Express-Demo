const shortid = require('shortid');
const db = require('../db');

module.exports.create = (req, res) => res.render('transfer/create');

module.exports.postCreate = (req, res) => {
  const { accountId, amount } = req.body;
  const { userId } = req.signedCookies;

  db.get('transfers').push({
    id: shortid.generate(),
    accountId,
    amount: parseInt(amount),
    userId
  }).write();

  res.redirect('/transfer/create');
}
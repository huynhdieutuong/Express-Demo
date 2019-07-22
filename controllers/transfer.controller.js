const Transfer = require('../models/transfer.model');

module.exports.create = (req, res) => res.render('transfer/create', {csrfToken: req.csrfToken()});

module.exports.postCreate = async (req, res) => {
  const { accountId, amount } = req.body;
  const { userId } = req.signedCookies;

  await Transfer.create({
    accountId,
    amount: parseInt(amount),
    userId
  });

  res.redirect('/transfer/create');
}
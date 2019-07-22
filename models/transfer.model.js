const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
  accountId: String,
  amount: Number,
  userId: String
});

const Transfer = mongoose.model('Transfer', transferSchema, 'transfers');

module.exports = Transfer;
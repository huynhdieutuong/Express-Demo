const User = require('../../models/user.model');

module.exports.index = async (req, res) => {
  const users = await User.find();
  res.json(users);
}

module.exports.view = async(req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json(user);
}

module.exports.create = async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
}

module.exports.update = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body);
  res.json(user);
}

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.send('deleted');
}
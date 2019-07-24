const Product = require('../../models/product.model');

module.exports.index = async (req, res) => {
  const products = await Product.find();
  res.json(products);
}

module.exports.view = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.json(product);
}

module.exports.create = async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
}

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndRemove(id);
  res.send('removed');
}

module.exports.patch = async(req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body);
  res.json(product);
}

module.exports.put = async(req, res) => {
  const { id } = req.params;
  const product = await Product.replaceOne({ _id: id }, req.body);
  res.json(product);
}
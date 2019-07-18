const shortid = require('shortid');
const db = require('../db');
const products = db.get('products').value();

module.exports.index = (req, res) => {
  let page = parseInt(req.query.page) || 1;
  const perPage = 8;

  const start = (page - 1) * perPage;
  const end = page * perPage;

  const maxPage = Math.ceil(products.length / perPage) || 3;
  if(page < 1) {
    page = 1;
  }
  if(page > maxPage) {
    page = maxPage;
  }

  let arrPage = [page - 1, page, page + 1];
  if(page === 1) {
    arrPage = [1, 2, 3];
  }
  if(page === maxPage) {
    arrPage = [maxPage - 2, maxPage - 1, maxPage];
  }

  const prevPage = (page === maxPage) ? arrPage[1] : arrPage[0];
  const nextPage = (page === 1) ? 2 : arrPage[2];

  res.render('products/index', { 
    products: products.slice(start, end),
    pagination: true,
    arrPage,
    maxPage,
    page,
    prevPage,
    nextPage
  });
};

module.exports.create = (req, res) => res.render('products/create');
module.exports.postCreate = (req, res) => {
  req.body.id = shortid.generate();
  const { id, name, description } = req.body;

  let images = [];
  req.files.forEach(image => images.push('/uploads/products/' + image.filename));
  
  products.push({
    id,
    name,
    description,
    images
  });
  db.write();
  res.redirect('/products');
};

module.exports.search = (req, res) => {
  const { q } = req.query;
  const filtered = products.filter(
    product => product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);
  
  res.render('products/index', {
    products: filtered,
    pagination: false,
    value: q
  })
};

module.exports.view = (req, res) => {
  const { id } = req.params;
  const product = db.get('products').find({id}).value();
  res.render('products/view', {
    product
  })
};
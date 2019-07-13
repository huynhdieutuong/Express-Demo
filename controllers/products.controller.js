const db = require('../db');
const products = db.get('products').value();

module.exports.index = (req, res) => {
  let page = parseInt(req.query.page);
  const perPage = 8;

  const start = (page - 1) * perPage;
  const end = page * perPage;

  const maxPage = Math.ceil(products.length / perPage);
  if(page < 1) {
    page = 1;
  }
  if(page > maxPage) {
    page = maxPage;
  }

  let arrPage = [];
  if(page === 1) {
    arrPage = [1, 2, 3];
  } else {
    if(page === maxPage) {
      arrPage = [maxPage - 2, maxPage - 1, maxPage];
    } else {
      if(page > 1 || page < maxPage){
        arrPage = [page - 1, page, page + 1];
      }
    }
  };

  const prevPage = (page === maxPage) ? arrPage[1] : arrPage[0];
  const nextPage = (page === 1) ? 2 : arrPage[2];
  res.render('products/index', { 
    products: products.slice(start, end),
    arrPage,
    maxPage,
    page,
    prevPage,
    nextPage
  });
}
const db = require('../db');

module.exports.addToCart = (req, res) => {
  const { sessionId } = req.signedCookies;
  const { productId } = req.params;

  if(!sessionId) {
    return res.redirect('/products');
  }

  const count = db.get('sessions')
    .find({ id: sessionId })
    .get('cart.' + productId, 0)
    .value();

  db.get('sessions')
    .find({ id: sessionId })
    .set('cart.' + productId, count + 1)
    .write();

  res.redirect('/products');
}
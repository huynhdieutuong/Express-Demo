const Session = require('../models/session.model');

module.exports.addToCart = async (req, res) => {
  const { sessionId } = req.signedCookies;
  const { productId } = req.params;

  if(!sessionId) {
    return res.redirect('/products');
  }

  const session = await Session.findById(sessionId);
  if(!session.cart) {
    session.cart = {};
  }
  const count = session.cart[productId] || 0;
  session.cart[productId] = count + 1;

  await Session.findByIdAndUpdate(sessionId, session);

  res.redirect('/products');
}
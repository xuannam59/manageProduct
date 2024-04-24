const Cart = require("../../models/cart.model");

module.exports.cartId = async (req, res, next) => {

  if (!req.cookies.cartId) {
    const cart = new Cart();
    await cart.save();

    const expiredCookie = 3600 * 24 * 365 * 1000

    res.cookie("cartId", cart.id, { expires: new Date(Date.now() + expiredCookie) });
  } else {
    const cart = await Cart.findOne({ _id: req.cookies.cartId });
    cart.totalQuantity = cart.products.reduce((sum, item) => sum + item.quantity, 0);

    res.locals.miniCart = cart;
  }


  next();
}
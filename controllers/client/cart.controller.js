const Cart = require("../../models/cart.model");

// [GET] /cart/add/:productId
module.exports.addPost = async (req, res) => {
  const productId = req.params.productId;
  const quantity = parseInt(req.body.quantity);
  const cartId = req.cookies.cartId;

  const cart = await Cart.findOne({
    _id: cartId
  })

  const existProductInCart = cart.products.find(item => item.product_id == productId);

  if (existProductInCart) {
    const newQuantity = quantity + existProductInCart.quantity;

    await Cart.updateOne(
      {
        _id: cartId,
        "products.product_id": productId
      }, {
      $set: {
        "products.$.quantity": newQuantity
      }
    }
    )
  } else {
    const objectCart = {
      product_id: productId,
      quantity: quantity,
    }

    await Cart.updateOne(
      {
        _id: cartId
      },
      {
        $push: { products: objectCart }
      }
    );
  };




  res.redirect("back");
}
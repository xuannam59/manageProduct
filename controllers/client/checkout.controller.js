const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");

const productHelpers = require("../../helpers/product");
const Order = require("../../models/order.model");

// [GET] /checkout
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId;

  const cart = await Cart.findOne({
    _id: cartId,
  })

  cart.totalPrice = 0;

  for (const item of cart.products) {
    const product = await Product.findOne({
      _id: item.product_id
    }).select("title price discountPercentage thumbnail");

    product.newPrice = productHelpers.newPriceProduct(product);

    item.productInfor = product;

    item.totalPrice = product.newPrice * item.quantity;

    cart.totalPrice += item.totalPrice;
  }

  res.render("client/pages/checkout/index", {
    pageTitle: "Thanh toán",
    cartDetail: cart,
  })
}

// [POST] /checkout/order
module.exports.orderPost = async (req, res) => {
  const cartId = req.cookies.cartId;
  const userInfor = req.body;

  const cart = await Cart.findOne({
    _id: cartId,
  });

  const products = [];

  for (const product of cart.products) {
    const productInfor = await Product.findOne({
      _id: product.product_id
    }).select("price discountPercentage");

    const objectProduct = {
      product_id: product.product_id,
      quantity: product.quantity,
      price: productInfor.price,
      discountPercentage: productInfor.discountPercentage,
    }

    products.push(objectProduct);
  }

  console.log(products);

  const orderInfor = {
    cart_id: cartId,
    userInfor: userInfor,
    products: products
  }


  const order = new Order(orderInfor);
  await order.save();

  await Cart.updateOne(
    {
      _id: cartId,
    }, {
    products: [],
  })

  res.redirect(`/checkout/success/${order.id}`);
}

//[GET] /checkout/success/:orderId
module.exports.success = (req, res) => {

  res.render("client/pages/checkout/success", {
    pageTitle: "Đặt hàng thành công",
  })
}
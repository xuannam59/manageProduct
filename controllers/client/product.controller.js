const products = require("../../models/product.model")

module.exports.index = (req, res) => {
  res.render("client/pages/products/index.pug", {
    pageTitle: "Sản Phẩm",
    products: products
  });
}
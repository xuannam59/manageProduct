const Product = require("../../models/product.model");

// [GET] /products
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: 'active',
    deleted: false
  })
    .sort({ position: "desc" });

  const newProduct = products.map((item) => {
    item.newPrice = (item.price * (100 - item.discountPercentage) / 100).toFixed();
    return item;
  })

  res.render("client/pages/products/index.pug", {
    pageTitle: "Sản Phẩm",
    products: newProduct,
  });
}
// [GET] /products/:slug
module.exports.detail = async (req, res) => {
  try {
    const slug = req.params.slug;
    const find = {
      slug: slug,
      deleted: false,
      status: "active"
    }
    const product = await Product.findOne(find);
    res.render("client/pages/products/detail", {
      pageTitle: product.title,
      product: product
    });
  } catch (error) {
    req.flash("error", "Không tồn tại sản phẩm đó");
    res.redirect("/products");
  }
}
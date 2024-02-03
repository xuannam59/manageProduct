const Product = require("../../models/product.model")
const filterStatusHelpers = require("../../helpers/filter-status")
const sreachHelpers = require("../../helpers/sreach")

// [GET] /adimin/products
module.exports.index = async (req, res) => {
  // filterStatus
  let filterStatus = filterStatusHelpers(req.query);
  // End filterStatus


  let find = {
    deleted: false
  };

  if (req.query.status) {
    find.status = req.query.status;
  }

  // Sreach
  let objectSreach = sreachHelpers(req.query);
  find.title = objectSreach.regex;
  // End sreach

  const products = await Product.find(find);
  res.render("admin/pages/products/index", {
    pageTitle: "trang Sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSreach.keyword
  });
}
const Product = require("../../models/product.model")
const filterStatusHelpers = require("../../helpers/filter-status")
const sreachHelpers = require("../../helpers/sreach")
const paginationHelpers = require("../../helpers/pagination")

// [GET] /adimin/products
module.exports.index = async (req, res) => {

  let find = {
    deleted: false
  };

  // filterStatus
  let filterStatus = filterStatusHelpers(req.query);
  if (req.query.status) {
    find.status = req.query.status;
  }
  // End filterStatus 

  // Sreach
  let objectSreach = sreachHelpers(req.query);
  if (objectSreach.regex) {
    find.title = objectSreach.regex;
  }
  // End sreach

  // Pagination
  const countProducts = await Product.countDocuments(find);
  let objectPagination = paginationHelpers(
    {
      currentPage: 1,
      limitItem: 4,
    },
    req.query,
    countProducts
  )
  // End pagination

  const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip);

  res.render("admin/pages/products/index", {
    pageTitle: "trang Sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSreach.keyword,
    pagination: objectPagination
  });
}
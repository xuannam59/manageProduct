const Product = require("../../models/product.model")
const filterStatusHelpers = require("../../helpers/filter-status")
const sreachHelpers = require("../../helpers/sreach")
const paginationHelpers = require("../../helpers/pagination")

// [GET] /admin/products
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

  const products = await Product.find(find)
    .sort({ position: "desc" })
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip);

  res.render("admin/pages/products/index", {
    pageTitle: "trang Sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSreach.keyword,
    pagination: objectPagination
  });
}

// [PATCH] /admin/product/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { status: status });

  res.redirect('back');
}

// [PATCH] /admin/product/change-status/:status/:id
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      break;
    case "delete-all":
      await Product.updateMany({ _id: { $in: ids } },
        {
          deleted: true,
          deletedAt: new Date()
        });
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await Product.updateOne({ _id: id }, { position: position });
      }
      break;
    default:
      break;
  }
  res.redirect('back');
}

// [DELETE] /admin/product/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  // await Product.deleteOne({ _id: id });
  await Product.updateOne({ _id: id },
    {
      deleted: true,
      deletedAt: new Date()
    });

  res.redirect('back');
}

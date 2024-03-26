const Product = require("../../models/product.model")
const filterStatusHelpers = require("../../helpers/filter-status")
const sreachHelpers = require("../../helpers/sreach")
const paginationHelpers = require("../../helpers/pagination")

const systemConfig = require("../../config/system")

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

  // Sort
  const sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort.position = "desc"
  }
  // End Sort

  const products = await Product.find(find)
    .sort(sort)
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

  req.flash('success', 'Đã cập nhập trạng thái thành công');
  res.redirect('back');
}

// [PATCH] /admin/product/change-status/:status/:id
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash('success', `Đã cập nhập trạng thái ${ids.length} sản phẩm`);
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash('success', `Đã cập nhập trạng thái ${ids.length} sản phẩm`);
      break;
    case "delete-all":
      await Product.updateMany({ _id: { $in: ids } },
        {
          deleted: true,
          deletedAt: new Date()
        });
      req.flash('success', `Đã xoá ${ids.length} sản phẩm`);
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await Product.updateOne({ _id: id }, { position: position });
      }
      req.flash('success', `Đã thay đổi vị trí ${ids.length} sản phẩm`);
      break;
    default:
      break;
  }
  res.redirect('back');
}

// [DELETE] /admin/product/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  await Product.deleteOne({ _id: id });
  // await Product.updateOne({ _id: id },
  //   {
  //     deleted: true,
  //     deletedAt: new Date()
  //   });
  req.flash('success', `Đã xoá thành công sản phẩm`);
  res.redirect('back');
}

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/products/create", {
    pageTitle: "tạo mới sản phẩm"
  });
}

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
  try {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.sock = parseInt(req.body.sock);
    if (req.body.position == "") {
      const countProducts = await Product.countDocuments();
      req.body.position = countProducts + 1;
    } else {
      req.body.position = parseInt(req.body.position);
    }
    const product = new Product(req.body);
    product.save();
    req.flash("success", "Thêm mới sản phẩm thành công!");
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  } catch (error) {
    req.flash("error", "Chỉnh sửa thất bại");
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const find = {
      deleted: false,
      _id: id
    }
    const product = await Product.findOne(find);
    res.render("admin/pages/products/edit", {
      pageTitle: product.title,
      product: product
    });
  } catch (error) {
    req.flash("error", "Không tồn tại sản phẩm đó");
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }

}

// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id
  req.body.price = parseFloat(req.body.price);
  req.body.discountPercentage = parseFloat(req.body.discountPercentage);
  req.body.stock = parseFloat(req.body.stock);
  req.body.position = parseFloat(req.body.position);
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }
  try {
    await Product.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhập thành công");
    res.redirect("back");
  } catch (error) {
    req.flash("error", "Cập nhập thất bại");
    res.redirect("back");
  }
}

// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    const find = {
      deleted: false,
      _id: id
    }
    const product = await Product.findOne(find);
    res.render("admin/pages/products/detail", {
      pageTitle: product.title,
      product: product
    });
  } catch (error) {
    req.flash("error", "Không tồn tại sản phẩm đó");
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }

}
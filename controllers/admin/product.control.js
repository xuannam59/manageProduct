const Product = require("../../models/product.model")

// [GET] /adimin/products
module.exports.index = async (req, res) => {
  // render ra các nút và xử lý thêm class = "active"
  let filterStatus = [
    {
      name: "Tất cả",
      status: "",
      class: ""
    },
    {
      name: "Hoạt động",
      status: "active",
      class: ""
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: ""
    }
  ];

  if (req.query.status) {
    const index = filterStatus.findIndex(item => item.status == req.query.status)
    filterStatus[index].class = "active"
  } else {
    filterStatus[0].class = "active"
  }
  // end render ra các nút và xử lý thêm class = "active"

  let find = {
    deleted: false
  };

  if (req.query.status) {
    find.status = req.query.status;
  }
  if (req.query.keyword) {
    find.title = req.query.keyword;
  }
  const products = await Product.find(find);
  res.render("admin/pages/products/index", {
    pageTitle: "trang Sản phẩm",
    products: products,
    filterStatus: filterStatus
  });
}
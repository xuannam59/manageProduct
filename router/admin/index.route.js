const dashboardRouter = require("./dashboard.route");
const systemConfig = require("../../config/system");
const productRouter = require("./product.route");
const productCategoryRouter = require("./product-category.route");


module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(`${PATH_ADMIN}/dashboard`, dashboardRouter);
  app.use(`${PATH_ADMIN}/products-category`, productCategoryRouter);
  app.use(`${PATH_ADMIN}/products`, productRouter);
}
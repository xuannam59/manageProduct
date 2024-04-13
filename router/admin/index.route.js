const systemConfig = require("../../config/system");
const dashboardRouter = require("./dashboard.route");
const productRouter = require("./product.route");
const productCategoryRouter = require("./product-category.route");
const rolesRouter = require("./role.route");
const accountRouter = require("./accounts.route");


module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(`${PATH_ADMIN}/dashboard`, dashboardRouter);
  app.use(`${PATH_ADMIN}/products-category`, productCategoryRouter);
  app.use(`${PATH_ADMIN}/products`, productRouter);
  app.use(`${PATH_ADMIN}/roles`, rolesRouter);
  app.use(`${PATH_ADMIN}/accounts`, accountRouter);
}
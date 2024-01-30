const dashboardRouter = require("./dashboard.route");
const systemConfig = require("../../config/system");
const productdRouter = require("./product.route");


module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(`${PATH_ADMIN}/dashboard`, dashboardRouter);
  app.use(`${PATH_ADMIN}/products`, productdRouter);
}
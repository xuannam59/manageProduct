const User = require("../../models/user.model");

module.exports.user = async (req, res, next) => {
  const tokenUser = req.cookies.tokenUser;
  const user = await User.findOne({
    tokenUser: tokenUser
  });
  if (user) {
    res.locals.user = user;
  }

  next();
}
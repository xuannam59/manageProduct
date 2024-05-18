const User = require("../../models/user.model");

module.exports.requireAuth = async (req, res, next) => {
  const tokenUser = req.cookies.tokenUser;
  const user = await User.findOne({ tokenUser: tokenUser }).select("-password");

  if (!user) {
    res.redirect("/user/login");
    return;
  }

  res.location.user = user;
  next();
}
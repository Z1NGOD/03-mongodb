const getUserInfo = async (req, res, next) => {
  console.log("contacts: " + req.user.contacts);
  res.status(200).json({ user: req.user, contacts: req.user.contacts });
};
module.exports = getUserInfo;

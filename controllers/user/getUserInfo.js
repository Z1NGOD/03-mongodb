const getUserInfo = async (req, res, next) => {
  res.status(200).json({ user: req.user, contacts: req.user.contacts });
};
module.exports = getUserInfo;

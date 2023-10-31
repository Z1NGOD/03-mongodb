const Contact = require("../../models/contacts");
const getAll = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const allContacts = await Contact.find({ owner }, "-createAt -updateAt", {
      skip,
      limit,
    }).populate("owner", "email");
    res.status(200).json({ allContacts, query: allContacts.length });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = getAll;

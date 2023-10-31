const Contact = require("../../models/contacts");
const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json({ message: "Not found" });
  }
};
module.exports = getById;

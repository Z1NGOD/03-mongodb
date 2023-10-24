const Contact = require("../../models/contacts");
const deleteById = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndRemove(req.params.contactId);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted", contact });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
module.exports = deleteById;

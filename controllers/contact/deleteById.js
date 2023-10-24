const Contact = require("../../models/contacts");
const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId);
    if (!contact) {
      next(new Error("Not found"));
    }
    const deletedContact = await Contact.findByIdAndRemove(contactId);
    res.status(200).json({ message: "Contact deleted", deletedContact });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
module.exports = deleteById;

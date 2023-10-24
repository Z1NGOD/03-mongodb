const Contact = require("../../models/contacts");
const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true }
    );
    res.status(200).json({ message: "Contact updated", updatedContact });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};
module.exports = updateStatusContact;

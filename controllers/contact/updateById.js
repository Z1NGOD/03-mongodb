const Contact = require("../../models/contacts");
const updateById = async (req, res, next) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body,
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "Contact updated", updatedContact });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};
module.exports = updateById;

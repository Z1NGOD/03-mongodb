const Contact = require("../../models/contacts");
const add = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
module.exports = add;

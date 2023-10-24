const Contact = require("../../models/contacts");
const add = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const newContact = await Contact.create({ ...req.body, owner });
    res.status(201).json(newContact);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
module.exports = add;

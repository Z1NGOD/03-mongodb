const { model } = require("mongoose");
const schema = require("../schemas/usersSchema");
const User = model("user", schema);
const addUser = async (body) => {
  return User.create(body);
};
const findUser = async (email) => {
  return User.findOne(email);
};
module.exports = { addUser, findUser };

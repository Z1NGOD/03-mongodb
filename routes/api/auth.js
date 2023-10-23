const express = require("express");
const router = express.Router();
const controller = require("../../controllers/auth/index");
const wrapper = require("../../helpers/controllerWrapper")
router.post("/registration", wrapper(controller.registration));
router.post("/login", wrapper(controller.login));
module.exports = router;

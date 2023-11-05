const express = require("express");
const router = express.Router();
const controller = require("../../controllers/auth/index");
const wrapper = require("../../helpers/controllerWrapper");

router.post("/registration", wrapper(controller.registration));
router.post("/login", wrapper(controller.login));
router.get("/verify/:verificationToken", wrapper(controller.verify));
module.exports = router;

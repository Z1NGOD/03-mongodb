const express = require("express");
const router = express.Router();
const controller = require("../../controllers/user/index");
const wrapper = require("../../helpers/controllerWrapper");
const auth = require("../../middlewares/authorizationMiddleware");

router.post("/logout", wrapper(auth), wrapper(controller.logout));
router.get("/getContacts", wrapper(auth), wrapper(controller.getContacts));
router.get("/current", wrapper(auth), wrapper(controller.getUserInfo));

module.exports = router;

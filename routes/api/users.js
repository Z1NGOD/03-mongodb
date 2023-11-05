const express = require("express");
const router = express.Router();
const controller = require("../../controllers/user/index");
const wrapper = require("../../helpers/controllerWrapper");
const auth = require("../../middlewares/authorizationMiddleware");
const uploadMiddleware = require("../../middlewares/uploadMiddleware");

router.post("/logout", wrapper(auth), wrapper(controller.logout));
router.get("/current", wrapper(auth), wrapper(controller.getUserInfo));
router.patch(
  "/avatars",
  uploadMiddleware.single("avatar"),
  wrapper(controller.updateAvatar)
);
router.post("/verify", wrapper(controller.verify));

module.exports = router;

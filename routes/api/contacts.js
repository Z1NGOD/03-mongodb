const express = require("express");
const router = express.Router();
const controller = require("../../controllers/contact/index");
const validate = require("../../middlewares/validationMiddleware");
const schema = require("../../schemas/schema");
const wrapper = require("../../helpers/controllerWrapper");
const auth = require("../../middlewares/authorizationMiddleware");
router.get("/", wrapper(auth), wrapper(controller.getAll));

router.get("/:contactId", wrapper(auth), wrapper(controller.getById));

router.post("/", wrapper(auth), wrapper(controller.add));

router.delete("/:contactId", wrapper(auth), wrapper(controller.deleteById));

router.put("/:contactId", wrapper(auth), wrapper(controller.updateById));

router.patch(
  "/:contactId/favorite",
  wrapper(auth),
  validate(schema),
  wrapper(controller.updateStatusContact)
);

module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../../controllers/contact/index");
const validate = require("../../middlewares/validationMiddleware");
const schema = require("../../schemas/schema");
const wrapper = require("../../helpers/controllerWrapper.js")
router.get("/", wrapper(controller.getAll));

router.get("/:contactId", wrapper(controller.getById));

router.post("/", wrapper(controller.add));

router.delete("/:contactId", wrapper(controller.deleteById));

router.put("/:contactId", wrapper(controller.updateById));

router.patch(
  "/:contactId/favorite",
  validate(schema),
  wrapper(controller.updateStatusContact)
);

module.exports = router;

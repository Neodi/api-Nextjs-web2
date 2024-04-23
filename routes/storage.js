const express = require("express")
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage")
const { getItems, getItem, createItem, deleteItem, softDeleteItem, deleteItemChulo } = require("../controllers/storage")

const { validatorGetItem } = require("../validators/storage")

router.get("/", getItems)
router.get("/:id", validatorGetItem, getItem)

router.post("/postImg", uploadMiddleware.single("image"), createItem)
router.post("/postFile", uploadMiddleware.single("file"), createItem)
router.post("/postVideo", uploadMiddleware.single("video"), createItem)

router.delete("/softDelete/:id", validatorGetItem, softDeleteItem);
router.delete("/totalDelete/:id", validatorGetItem, deleteItem);


module.exports = router;
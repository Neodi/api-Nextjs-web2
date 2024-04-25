const express = require("express")
const router = express.Router();

const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/webs")
const { validatorGetItem, validatorCreateItem, validatorUpdateItem } = require("../validators/webs")

router.get("/", getItems)
router.get("/:id", validatorGetItem, getItem)

router.post("/", validatorCreateItem, createItem)

router.patch("/:id", validatorGetItem, validatorUpdateItem, updateItem)

router.delete("/totalDelete/:id", validatorGetItem, deleteItem)

module.exports = router;    
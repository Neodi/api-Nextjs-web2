const express = require("express")
const router = express.Router();

const { getItems, getItem, createItem, updateItem, deleteItem, softDeleteItem } = require("../controllers/comercios")
const { validatorGetItem, validatorCreateItem, validatorUpdateItem } = require("../validators/comercios")


router.get("/", getItems)
router.get("/:id", validatorGetItem, getItem)

router.post("/", validatorCreateItem, createItem)

router.patch("/:id", validatorGetItem, validatorUpdateItem, updateItem)

router.delete("/totalDelete/:id", validatorGetItem, deleteItem)
router.delete("/softDelete/:id", validatorGetItem, softDeleteItem)

module.exports = router;

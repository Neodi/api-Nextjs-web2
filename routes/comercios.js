const express = require("express")
const router = express.Router();


const { getItems, getItem, createItem, updateItem, deleteItem, softDeleteItem, getTokenComercio } = require("../controllers/comercios")
const { validatorGetItem, validatorCreateItem, validatorUpdateItem, validatorCiudad } = require("../validators/comercios")

const { authMiddleware, comercioMiddleware } = require("../middleware/session")
const { checkRol } = require("../middleware/rol")

router.get("/", getItems)
router.get("/getToken/:id", validatorGetItem, getTokenComercio)
router.get("/id/:id", validatorGetItem, getItem)

router.post("/", authMiddleware, checkRol(['admin']), validatorCreateItem, createItem)

// router.patch("/:id", validatorGetItem, validatorUpdateItem, updateItem)
router.patch("/:id", authMiddleware, checkRol(['admin']), validatorUpdateItem, updateItem)

router.delete("/:id", authMiddleware, checkRol(['admin']), validatorGetItem, softDeleteItem)
module.exports = router;

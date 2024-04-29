const express = require("express")
const router = express.Router();

const { getItems, getItem, createItem, updateItem, deleteItem, buscarWebComercio, getOfertaCiudad } = require("../controllers/webs")
const { validatorGetItem, validatorCreateItem, validatorUpdateItem, validatorCiudad } = require("../validators/webs")

const { authMiddleware } = require("../middleware/session")

router.get("/", getItems)
router.get("/id/:id", validatorGetItem, getItem)
router.get("/buscar/:ciudad", validatorCiudad, buscarWebComercio)
router.get("/ofertas/", authMiddleware, getOfertaCiudad )


router.post("/", validatorCreateItem, createItem)

router.patch("/:id", validatorGetItem, validatorUpdateItem, updateItem)

router.delete("/totalDelete/:id", validatorGetItem, deleteItem)

module.exports = router;    
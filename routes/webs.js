const express = require("express")
const router = express.Router();

const uploadMiddleware = require("../utils/handleStorage")

const { getItems, getItem, createItem, updateItem, deleteItem,
        buscarWebComercio, getMailsUsers, añadirReseña, updateItemComercio,
        postPhotoWeb } = require("../controllers/webs")
        
const { validatorGetItem, validatorCreateItem, validatorUpdateItem, validatorCiudad, validatorReview } = require("../validators/webs")

const { authMiddleware, comercioMiddleware } = require("../middleware/session")
const { checkRol } = require ("../middleware/rol")


router.get("/", getItems)
router.get("/id/:id", validatorGetItem, getItem)

router.get("/buscar/:ciudad", validatorCiudad, buscarWebComercio)
router.get("/ofertas/", comercioMiddleware,  getMailsUsers)


router.post("/", comercioMiddleware,  validatorCreateItem, createItem)
router.post("/addReview/:id", authMiddleware, validatorGetItem, validatorReview, añadirReseña)
router.post("/addPhoto/", comercioMiddleware, uploadMiddleware.single("image"), postPhotoWeb)

router.patch("/:id", authMiddleware, checkRol(['admin']), validatorGetItem, validatorUpdateItem, updateItem)
router.patch("/", comercioMiddleware, validatorUpdateItem, updateItemComercio)

router.delete("/:soft", comercioMiddleware, deleteItem)

module.exports = router;    
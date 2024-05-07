const express = require("express")
const router = express.Router()

const { loginCtrl, registerCtrl, getUsers, updateUser, deleteUser, softDeleteUser, borrarCuenta} = require("../controllers/auth")
const { validatorGetItem, validatorUpdateItem, validatorLogin, validatorRegister } = require("../validators/auth")

const { authMiddleware } = require("../middleware/session")
const { checkRol } = require ("../middleware/rol")

router.post("/register", validatorRegister, registerCtrl)
router.post("/login", validatorLogin, loginCtrl)

router.get("/", authMiddleware, checkRol(['user', 'admin']), getUsers)

router.patch("/", authMiddleware, validatorUpdateItem, updateUser)

router.delete("/totalDelete/:id", validatorGetItem, deleteUser)
router.delete("/softDelete/:id", validatorGetItem, softDeleteUser)
router.delete("/borrarCuenta/:soft", authMiddleware, borrarCuenta)

module.exports = router


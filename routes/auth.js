const express = require("express")
const router = express.Router()

const { loginCtrl, registerCtrl, getUsers, updateUser, deleteUser, softDeleteUser, borrarCuenta} = require("../controllers/auth")
const { validatorGetItem, validatorUpdateItem, validatorLogin, validatorRegister } = require("../validators/auth")

const { authMiddleware } = require("../middleware/session")
const { checkRol } = require ("../middleware/rol")

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/users'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *       400:
 *         description: Some parameters are missing or invalid
 *       500:
 *         description: Unexpected error
 */
router.post("/register", validatorRegister, registerCtrl)
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: 'object'
 *             required: ['email', 'password']
 *             properties:
 *               email: { type: 'string', example: 'john.doe@example.com' }
 *               password: { type: 'string', example: 'password123' }
 *     responses:
 *       200:
 *         description: The user was successfully logged in
 *       400:
 *         description: Some parameters are missing or invalid
 *       500:
 *         description: Unexpected error
 */
router.post("/login", validatorLogin, loginCtrl)

/**
 * @swagger
 *  /api/auth:
 *   patch:
 *     summary: Update a user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/users'
 *     responses:
 *       200:
 *         description: The user was successfully updated
 *       400:
 *         description: Some parameters are missing or invalid
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Unexpected error
 */
router.patch("/", authMiddleware, validatorUpdateItem, updateUser)

/**
 * @swagger
 * /api/auth/borrarCuenta/{soft}:
 *   delete:
 *     summary: Delete a user account
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: soft
 *         schema:
 *           type: string
 *         required: true
 *         description: Soft delete flag, Si soft === true, se borrará la cuenta de forma lógica, si soft === false, se borrará la cuenta de forma física
 *     responses:
 *       200:
 *         description: The user account was successfully deleted
 *       400:
 *         description: Some parameters are missing or invalid
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Unexpected error
 */
router.delete("/borrarCuenta/:soft", authMiddleware, borrarCuenta)

/////////////
router.get("/", authMiddleware, checkRol(['user', 'admin']), getUsers)
router.delete("/totalDelete/:id", validatorGetItem, deleteUser)
router.delete("/softDelete/:id", validatorGetItem, softDeleteUser)


module.exports = router


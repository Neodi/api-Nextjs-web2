const express = require("express")
const router = express.Router();


const { getItems, getItem, createItem, updateItem, deleteItem, softDeleteItem, getTokenComercio } = require("../controllers/comercios")
const { validatorGetItem, validatorCreateItem, validatorUpdateItem, validatorCiudad } = require("../validators/comercios")

const { authMiddleware, comercioMiddleware } = require("../middleware/session")
const { checkRol } = require("../middleware/rol")

/**
 * @swagger
 * /api/comercios/:
 *   get:
 *     summary: Retrieve a list of items
 *     description: This endpoint retrieves all items available in the system. Each item includes information such as name, CIF, address, email, and phone number.
 *     tags: [Comercios]
 *     responses:
 *       200:
 *         description: A list of items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/comercios'
 *       500:
 *         description: Unexpected error
 */
router.get("/", getItems)

/**
 * @swagger
 * /api/comercios/id/{id}:
 *   get:
 *     summary: Recupera un ítem
 *     description: Este endpoint recupera un ítem específico del sistema utilizando su ID.
 *     tags: [Comercios]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           default: 6630f32fdd0123f99b145966 
 *         required: true
 *         description: ID del ítem
 *     responses:
 *       200:
 *         description: Un ítem
 *       400:
 *         description: Algunos parámetros faltan o son inválidos
 *       404:
 *         description: Ítem no encontrado
 *       500:
 *         description: Error inesperado
 */
router.get("/id/:id", validatorGetItem, getItem)

/**
 * @swagger
 * /api/comercios/:
 *   post:
 *     summary: Crea un nuevo ítem
 *     description: Este endpoint crea un nuevo ítem en el sistema. Solo los usuarios con rol de 'admin' pueden crear ítems.
 *     tags: [Comercios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/comercios'
 *     responses:
 *       200:
 *         description: Ítem creado exitosamente
 *       400:
 *         description: Algunos parámetros faltan o son inválidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error inesperado
 */
router.post("/", authMiddleware, checkRol(['admin']), validatorCreateItem, createItem)


/**
 * @swagger
 * /api/comercios/{id}:
 *   patch:
 *     summary: Actualiza un ítem
 *     description: Este endpoint actualiza un ítem específico en el sistema utilizando su ID. Solo los usuarios con rol de 'admin' pueden actualizar ítems.
 *     tags: [Comercios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           default: 6630f32fdd0123f99b145966
 *         required: true
 *         description: ID del ítem
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/comercios'
 *     responses:
 *       200:
 *         description: Ítem actualizado exitosamente
 *       400:
 *         description: Algunos parámetros faltan o son inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Ítem no encontrado
 *       500:
 *         description: Error inesperado
 */
router.patch("/:id", authMiddleware, checkRol(['admin']), validatorUpdateItem, updateItem)

/**
 * @swagger
 * /api/comercios/{id}:
 *   delete:
 *     summary: Elimina un comercio
 *     description: Este endpoint elimina un comercio específico en el sistema utilizando su ID. Solo los usuarios con rol de 'admin' pueden eliminar comercios. La eliminación es suave, lo que significa que el comercio no se elimina realmente, sino que se marca como eliminado.
 *     tags: [Comercios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del comercio
 *       - in: query
 *         name: soft
 *         schema:
 *           type: string
 *           enum: ['true', 'false']
 *         description: Indica si se deben recuperar solo los ítems marcados como eliminados
 *
 *     responses:
 *       200:
 *         description: Comercio eliminado exitosamente
 *       400:
 *         description: Algunos parámetros faltan o son inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Comercio no encontrado
 *       500:
 *         description: Error inesperado
 */
router.delete("/:id", authMiddleware, checkRol(['admin']), validatorGetItem, softDeleteItem)

///////
router.get("/getToken/:id", validatorGetItem, getTokenComercio)




module.exports = router;

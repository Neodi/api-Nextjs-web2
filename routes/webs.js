const express = require("express")
const router = express.Router();

const uploadMiddleware = require("../utils/handleStorage")

const { getItems, getItem, createItem, updateItem, deleteItem,
        buscarWebComercio, getMailsUsers, añadirReseña, updateWebComercio,
        postPhotoWeb } = require("../controllers/webs")
        
const { validatorGetItem, validatorCreateItem, validatorUpdateItem, validatorCiudad, validatorReview } = require("../validators/webs")

const { authMiddleware, comercioMiddleware } = require("../middleware/session")
const { checkRol } = require ("../middleware/rol")

/**
 * @swagger
 * /api/webs/:
 *   get:
 *     summary: Retrieve a list of items
 *     description: Develve toddas las webs disponibles en el sistema.
 *     tags: [Webs]
 *     responses:
 *       200:
 *         description: A list of items
 *       500:
 *         description: Unexpected error
 */
router.get("/", getItems)

/**
 * @swagger
 * /api/webs/id/{id}:
 *   get:
 *     summary: Recupera un ítem
 *     description: Este endpoint recupera un ítem específico del sistema utilizando su ID.
 *     tags: [Webs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           default: 6630f32fdd0123f99b145967 
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
 * /api/webs/buscar/{ciudad}:
 *   get:
 *     summary: Busca comercios en una ciudad
 *     description: Este endpoint busca todos los comercios en una ciudad específica. También puedes filtrar los resultados por actividad y ordenarlos por puntuación.
 *     tags: [Webs]
 *     parameters:
 *       - in: path
 *         name: ciudad
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de la ciudad
 *       - in: query
 *         name: scoring
 *         schema:
 *           type: string
 *           enum: ['asc', 'desc']
 *         description: Orden de los resultados basado en la puntuación
 *       - in: query
 *         name: actividad
 *         schema:
 *           type: string
 *         description: Filtra los resultados por actividad
 *     responses:
 *       200:
 *         description: Una lista de comercios en la ciudad especificada
 *       400:
 *         description: Algunos parámetros faltan o son inválidos
 *       500:
 *         description: Error inesperado
 */
router.get("/buscar/:ciudad", validatorCiudad, buscarWebComercio)


/**
 * @swagger
 * /api/webs/ofertas/:
 *   get:
 *     summary: Recupera los correos electrónicos de los usuarios
 *     description: Este endpoint recupera los correos electrónicos de los usuarios que han optado por recibir ofertas. Solo los comercios pueden acceder a esta información.
 *     tags: [Webs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Una lista de correos electrónicos de usuarios
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error inesperado
 */
router.get("/ofertas/", comercioMiddleware,  getMailsUsers)

/**
 * @swagger
 * /api/webs/:
 *   post:
 *     summary: Crea un nuevo ítem
 *     description: Este endpoint crea un nuevo ítem en el sistema. Solo los comercios pueden crear ítems.
 *     tags: [Webs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/webs'
 *     responses:
 *       201:
 *         description: Ítem creado exitosamente
 *       400:
 *         description: Algunos parámetros faltan o son inválidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error inesperado
 */
router.post("/", comercioMiddleware,  validatorCreateItem, createItem)

/**
 * @swagger
 * /api/webs/addReview/{id}:
 *   post:
 *     summary: Añade una reseña a un ítem
 *     description: Este endpoint añade una reseña a un ítem específico en el sistema utilizando su ID. Solo los usuarios autenticados pueden añadir reseñas.
 *     tags: [Reseñas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           default: 5f86b82c20f04b11981449c3
 *         required: true
 *         description: ID del ítem
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/reseña'
 *     responses:
 *       201:
 *         description: Reseña añadida exitosamente
 *       400:
 *         description: Algunos parámetros faltan o son inválidos
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Ítem no encontrado
 *       500:
 *         description: Error inesperado
 */
router.post("/addReview/:id", authMiddleware, validatorGetItem, validatorReview, añadirReseña)


/**
 * @swagger
 * /api/webs/addPhoto/:
 *   post:
 *     summary: Añade una foto a un comercio
 *     description: Este endpoint permite a un comercio añadir una foto a su perfil. Solo los comercios pueden añadir fotos.
 *     tags: [Comercios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: La foto a subir.
 *     responses:
 *       200:
 *         description: Foto añadida exitosamente
 *       400:
 *         description: Algunos parámetros faltan o son inválidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error inesperado
 */
router.post("/addPhoto/", comercioMiddleware, uploadMiddleware.single("image"), postPhotoWeb)

/**
 * @swagger
 * /api/webs/:
 *   patch:
 *     summary: Actualiza una Web de un comercio
 *     description: Este endpoint actualiza la Web de un comercio en el sistema. Solo los comercios pueden actualizar su propia información.
 *     tags: [Webs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/webs'
 *     responses:
 *       200:
 *         description: Comercio actualizado exitosamente
 *       400:
 *         description: Algunos parámetros faltan o son inválidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error inesperado
 */
router.patch("/", comercioMiddleware, validatorUpdateItem, updateWebComercio)

/**
* @swagger
* /api/webs/{soft}:
*   delete:
*     summary: Elimina un ítem de manera suave
*     description: Este endpoint elimina un ítem específico en el sistema utilizando su identificador. Solo los comercios pueden eliminar ítems. La eliminación es suave, lo que significa que el ítem no se elimina realmente, sino que se marca como eliminado.
*     tags: [Webs]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: soft
*         schema:
*           type: string
*           enum: ['true', 'false']            
*         required: true
*     responses:
*       200:
*         description: Ítem eliminado exitosamente
*       400:
*         description: Algunos parámetros faltan o son inválidos
*       401:
*         description: No autorizado
*       404:
*         description: Ítem no encontrado
*       500:
*         description: Error inesperado
*/
router.delete("/:soft", comercioMiddleware, deleteItem)
/////
router.patch("/:id", authMiddleware, checkRol(['admin']), validatorGetItem, validatorUpdateItem, updateItem)





module.exports = router;    
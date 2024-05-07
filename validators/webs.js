const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorGetItem = [
    check("id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorCreateItem = [
    check("ciudad").isString().notEmpty(),
    check("actividad").isString().notEmpty(),
    check("titulo").isString().notEmpty(),
    check("resumen").isString().notEmpty(),
    check("textos").optional().isArray().notEmpty(),
    check("textos.*").isString(),
    check("fotos").optional().isArray().notEmpty(),
    check("fotos.*").isMongoId(),

    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorUpdateItemAdmin = [
    check("ciudad").optional().isString().notEmpty(),
    check("actividad").optional().isString().notEmpty(),
    check("titulo").optional().isString().notEmpty(),
    check("resumen").optional().isString().notEmpty(),
    check("textos").optional().isArray().notEmpty(),
    check("textos.*").isString(),
    check("fotos").optional().isArray().notEmpty(),
    check("fotos.*").isMongoId(),
    check("scoring").optional().isInt(),
    check("numPuntuaciones").optional().isInt(),
    check("reseñas").optional().isArray().notEmpty(),
    check("reseñas.*.texto").optional().isString().notEmpty(),
    check("reseñas.*.puntuacion").optional().isInt().notEmpty(),
    check("reseñas.*.idUsuario").optional().isMongoId().notEmpty(),
    check("idComercio").optional().isMongoId().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorUpdateItem = [
    check("ciudad").optional().isString().notEmpty(),
    check("actividad").optional().isString().notEmpty(),
    check("titulo").optional().isString().notEmpty(),
    check("resumen").optional().isString().notEmpty(),
    check("textos").optional().isArray().notEmpty(),
    check("textos.*").isString(),
    check("fotos").optional().isArray().notEmpty(),
    check("fotos.*").isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorCiudad = [
    check("ciudad").exists().notEmpty().isString(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
] 

const validatorReview = [
    check("texto").optional().isString().notEmpty(),
    check("puntuacion").isInt().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]


module.exports = { validatorGetItem, validatorCreateItem, validatorUpdateItem, validatorCiudad, validatorReview, validatorUpdateItemAdmin}
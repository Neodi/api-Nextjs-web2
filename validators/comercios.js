const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorGetItem = [
    check("id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorCreateItem = [
    check("nombreComercio").exists().notEmpty(),
    check("cif").exists().notEmpty().isAlphanumeric(),
    check("direccion").exists().notEmpty().isString(),
    check("email").exists().notEmpty().isEmail(),
    check("telefono").exists().notEmpty().isInt(),
    check("idWeb").optional().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validatorUpdateItem = [
    check("nombreComercio").optional().notEmpty(),
    check("cif").optional().notEmpty().isAlphanumeric(),
    check("direccion").optional().notEmpty().isString(),
    check("email").optional().notEmpty().isEmail(),
    check("telefono").optional().notEmpty().isInt(),
    check("idWeb").optional().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];


module.exports = { validatorGetItem, validatorCreateItem, validatorUpdateItem }
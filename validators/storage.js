const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorGetItem = [
    check("id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];

const validateSoftDelete = [
    check('softDelete').exists().isBoolean().withMessage('softDelete must be a boolean').toBoolean(), 
    (req, res, next) => {
        return validateResults(req, res, next)
    }
];


module.exports = { validatorGetItem, validateSoftDelete }
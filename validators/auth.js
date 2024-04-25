const { check } = require('express-validator');
const validateResults = require('../utils/handleValidator');

const validatorRegister = [
    check('nombre').exists().notEmpty().isString().withMessage('nombre is required'),
    check('email').exists().notEmpty().isEmail().withMessage('email is required'),
    check('password').exists().notEmpty().isString().withMessage('password is required'),
    check('edad').exists().notEmpty().isNumeric().withMessage('edad is required').isInt({ min: 1 }).withMessage('edad must be at least 1'),
    check('ciudad').exists().notEmpty().isString().withMessage('ciudad is required'),
    check('intereses').optional().isArray().withMessage('intereses must be an array of strings'),
    check('intereses.*').optional().isString().withMessage('intereses must be an array of strings'),
    check('recibirOfertas').optional().isBoolean().withMessage('recibirOfertas must be a boolean').toBoolean(),
    check('role').optional().isIn(['user', 'admin']).withMessage('role must be user or admin'),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]

const validatorLogin = [
    check('email').exists().notEmpty().isEmail().withMessage('email is required'),
    check('password').exists().notEmpty().isString().withMessage('password is required'),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]

const validatorUpdateItem = [
    check('nombre').optional().isString().withMessage('nombre must be a string'),
    check('email').optional().isEmail().withMessage('email must be a valid email'),
    check('password').optional().isString().withMessage('password must be a string'),
    check('edad').optional().isNumeric().withMessage('edad must be a number').isInt({ min: 1 }).withMessage('edad must be at least 1'),
    check('ciudad').optional().isString().withMessage('ciudad must be a string'),
    check('intereses').optional().isArray().withMessage('intereses must be an array of strings'),
    check('intereses.*').optional().isString().withMessage('intereses must be an array of strings'),
    check('recibirOfertas').optional().isBoolean().withMessage('recibirOfertas must be a boolean').toBoolean(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]

const validatorGetItem = [
    check('id').exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]

module.exports = { validatorRegister, validatorLogin, validatorUpdateItem, validatorGetItem }
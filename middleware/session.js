const { handleHttpError } = require("../utils/handleError")
const { verifyToken } = require("../utils/handleJwt")
const { userModel, comercioModel } = require("../models")

const authMiddleware = async (req, res, next) => {
    try{
        if (!req.headers.authorization) {
            handleHttpError(res, "NOT_TOKEN", 401)
            return
        }

        const token = req.headers.authorization.split(' ').pop() 

        const dataToken = await verifyToken(token)

        if(!dataToken || !dataToken._id) {
            handleHttpError(res, "ERROR_ID_TOKEN", 401)
            return
        }
        const user = await userModel.findById(dataToken._id)

        req.user = user // Inyecto al user en la petición
        req.user._id = dataToken._id // Inyecto el id en la petición
        next()

    }catch(err){
        console.log(err)
        handleHttpError(res, "NOT_SESSION", 401)
    }
}

const comercioMiddleware = async (req, res, next) => {
    try{
        if (!req.headers.authorization) {
            handleHttpError(res, "NOT_TOKEN", 401)
            return
        }

        const token = req.headers.authorization.split(' ').pop() 

        const dataToken = await verifyToken(token)

        if(!dataToken || !dataToken._id) {
            handleHttpError(res, "ERROR_ID_TOKEN", 401)
            return
        }
        const comercio = await comercioModel.findById(dataToken._id)
        
        req.comercio = comercio 
        req.comercio._id = dataToken._id 
        next()

        }catch(err){
            console.log(err)
            handleHttpError(res, "NOT_SESSION", 401)
        }
    }
module.exports = {authMiddleware, comercioMiddleware}
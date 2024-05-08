const { handleHttpError } = require("../utils/handleError")


const checkRol = (roles) => (req, res, next) => {
    try{
        const {user} = req
        const userRoles = user.role
        // console.log("User roles", userRoles)
        // console.log("Parametros roles", roles)
        const checkValueRol = userRoles.some(role => roles.includes(role))
        if (!checkValueRol) {
            handleHttpError(res, "NOT_ALLOWED", 403)
            return
        }
        next()
    }catch(err){
        handleHttpError(res, "ERROR_PERMISSIONS", 403)
    }
}

module.exports = {checkRol}
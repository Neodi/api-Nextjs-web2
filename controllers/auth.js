const { matchedData } = require("express-validator")
const { tokenSign } = require("../utils/handleJwt")
const { encrypt, compare } = require("../utils/handlePassword")
const {handleHttpError} = require("../utils/handleError")
const {userModel} = require("../models")

const printMatchedData = (req, res, next) => {
    const body = matchedData(req);
    console.log("Matched Data: ", body);
    next();
}

const registerCtrl = async (req, res) => {
    try {
        const  body  = matchedData(req)
        const password = await encrypt(body.password)
        const rebody = {...body, password} 
        const dataUser = await userModel.create(rebody)

        dataUser.set('password', undefined, { strict: false })

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
        res.send(data)  
    }catch(err) {
        console.log(err)
        handleHttpError(res, "ERROR_REGISTER_USER")
    }
}

const loginCtrl = async (req, res) => {
    try {
        const body = matchedData(req)
        user = await userModel.findOne({email: body.email })
        if(!user){
            handleHttpError(res, "USER_NOT_EXISTS", 404)
            return
        }
        
        const hashPassword = user.password;
        const check = await compare(body.password, hashPassword)

        if(!check){
            handleHttpError(res, "INVALID_PASSWORD", 401)
            return
        }

        //Si no quisiera devolver el hash del password
        user.set('password', undefined, {strict: false})
        const data = {
            token: await tokenSign(user),
            user
        }

        res.send(data)

    }catch(err){
        console.log(err)
        handleHttpError(res, "ERROR_LOGIN_USER")
    }
}

const updateUser = async (req, res) => {
    try {  
        const id = req.user._id     
        const body = matchedData(req)

        if (body.password) {
            body.password = await encrypt(body.password)
        }
        
        const data = await userModel.findByIdAndUpdate(id, body, {new: true})
        res.send(data)    
    }catch(err){
        console.log(err) 
        handleHttpError(res, 'ERROR_UPDATE_USER')
    }
}

const deleteUser = async (req, res) => {
    try {
        const {id} = matchedData(req)
        
        const data = await userModel.deleteOne({_id:id})

        res.send(data)
    } catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_DELETE_USER')
    }
}

const softDeleteUser = async (req, res) => {
    try {
        const {id} = matchedData(req)
        
        const data = await userModel.delete({_id:id})

        res.send(data)
    } catch(err){
        console.log(err)
        handleHttpError(res, 'ERROR_DELETE_USER')
    }
}

const getUsers = async (req, res) => {
    try { 
        const data = await userModel.find({}) 

        res.send(data)
    } catch (err) {
        console.log(err) 
        handleHttpError(res, 'ERROR_GET_USERS') 
    }
}

const borrarCuenta = async (req, res) => {
    const id = req.user._id
    let data = {}
    if(req.params.soft === 'true'){
        try{
            data = await userModel.delete({_id:id})
            res.send(data)
        }catch(err){
            console.log(err)
            handleHttpError(res, 'ERROR_SOFT_DELETE_USER')
        }
    } else {
        try{
            data = await userModel.deleteOne({_id:id})
            res.send(data)
        }catch(err){
            console.log(err)
            handleHttpError(res, 'ERROR_TOTAL_DELETE_USER')
        }
    }
}


module.exports = { registerCtrl, loginCtrl, updateUser, getUsers, deleteUser, softDeleteUser, borrarCuenta }
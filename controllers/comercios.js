const { matchedData } = require("express-validator")
const { handleHttpError } = require("../utils/handleError")
const { comercioModel } = require("../models")

const { tokenSign } = require("../utils/handleJwt")


const getItems = async (req, res) => {
    try {
        const data = await comercioModel.find()
        res.send(data)
    } catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_GET_ITEMS")
    }
}

const getItem = async (req, res) =>{

    try{
        const { id } = matchedData(req)
        const data = await comercioModel.findById(id)
        res.send(data)

    }catch(err){
        console.log(err)
        handleHttpError(res, "ERROR_GET_ITEM")
    }
}

const createItem = async (req, res) => {
    try {
        const body = matchedData(req)
        //console.log(body)
        const dataCreate = await comercioModel.create(body)

        const data ={
            token: await tokenSign(dataCreate),
            user: dataCreate
        }

        res.send(data)
    } catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_CREATE_ITEM")
    }
}

const updateItem = async (req, res) => {
    
    try {
        const idComercio = req.comercio._id
        const body = matchedData(req)
        
        const data = await comercioModel.findByIdAndUpdate(idComercio, body, { new: true })
        res.send(data)
    }catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_UPDATE_ITEM")
    }
    
}

const deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const data = await comercioModel.deleteOne({_id: id})
        res.send(data)
    } catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_TOTAL_DELETE_ITEM")
    }
}

const softDeleteItem = async (req, res) => {
    const idComercio = req.comercio._id
    if(req.params.soft === "true"){
        try {
            const data = await comercioModel.delete({_id: idComercio})
            res.send(data)
        } catch (err) {
            console.log(err)
            handleHttpError(res, "ERROR_SOFT_DELETE_ITEM")
        }
    }else{
        try {
            const data = await comercioModel.deleteOne({_id: idComercio})
            res.send(data)
        } catch (err) {
            console.log(err)
            handleHttpError(res, "ERROR_TOTAL_DELETE_ITEM")
        }
    }
    
}


const getTokenComercio = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const comercio = await comercioModel.findById(id)
        const data = {
            token: await tokenSign(comercio),
            comercio
        }
        res.send(data)
    }
    catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_GET_TOKEN")
    }
}

module.exports = { getItems, getItem, createItem, updateItem, deleteItem, softDeleteItem, getTokenComercio}
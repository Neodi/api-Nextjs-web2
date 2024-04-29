const { matchedData } = require("express-validator")
const { handleHttpError } = require("../utils/handleError")
const { webModel } = require("../models")


const getItems = async (req, res) => {
    try {
        const data = await webModel.find()
        res.send(data)
    } catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_GET_ITEMS")
    }
}

const getItem = async (req, res) =>{

    try{
        const { id } = matchedData(req)
        const data = await webModel.findById(id)
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
        const data = await webModel.create(body)
        res.send(data)
    } catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_CREATE_ITEM")
    }
}

const updateItem = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req)
        const data = await webModel.findByIdAndUpdate(id, body, { new: true })
        res.send(data)
    }catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_UPDATE_ITEM")
    }   
}

const deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const data = await webModel.deleteOne({_id: id})
        res.send(data)
    } catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_TOTAL_DELETE_ITEM")
    }
}

const softDeleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const data = await webModel.findByIdAndUpdate(id, { deleted: true }, { new: true })
        res.send(data)
    } catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_SOFT_DELETE_ITEM")
    }
}

const buscarWebComercio = async (req, res) => {
    const {ciudad} = matchedData(req)
    const { actividad, scoring } = req.query
    console.log("Ciudad", ciudad)
    console.log("Actividad", actividad)
    console.log("Scoring", scoring)
    
    try{
        let query = {}
        if(ciudad){
            query = {...query, ciudad: new RegExp(ciudad, 'i')}
        }
        if(actividad){
            query = {...query, actividad: new RegExp(actividad, 'i')}
        }
        let data = await webModel.find(query)

        if(scoring === "asc"){
            data.sort((a, b) => a.scoring - b.scoring)
        }else if(scoring === "desc"){
            data.sort((a, b) => b.scoring - a.scoring)
        }

        res.send(data)
    }catch(err){
        console.log(err)
        handleHttpError(res, "ERROR_BUSCAR_WEB_COMERCIO")
    }
}

const getOfertaCiudad = async (req, res) => {
    const  ciudad = req.user.ciudad
    const recivirOferta = req.query.recibirOfertas
    if(recivirOferta === "true"){
        try {
            const data = await webModel.find({ ciudad: ciudad })
            res.send(data)
        } catch (err) {
            console.log(err)
            handleHttpError(res, "ERROR_GET_OFERTA_CIUDAD")
        }
    }else{
        res.send("No quiere recibir ofertas")
    }   
    
}

const añadirReseña = async (req, res) => {
    try {
        const { id, reseña } = matchedData(req)
        const data = await webModel.findByIdAndUpdate(id, { $push: { reseñas: reseña } }, { new: true })
        res.send(data)
    } catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_AÑADIR_RESEÑA")
    }
}

module.exports = { 
    getItems, getItem, 
    createItem, 
    updateItem, 
    deleteItem, 
    softDeleteItem, buscarWebComercio, getOfertaCiudad}


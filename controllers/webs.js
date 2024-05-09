const { matchedData } = require("express-validator")
const { handleHttpError } = require("../utils/handleError")
const { webModel, userModel, storageModel } = require("../models")



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
    const { idWeb } = req.comercio
    try {
        const body = matchedData(req)
        body._id = idWeb
        body.idComercio = req.comercio._id
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

const updateWebComercio = async (req, res) => {
    const id = req.comercio.idWeb
    try {
        const body  = matchedData(req)
        const data = await webModel.findByIdAndUpdate(id, body, { new: true })
        res.send(data)
    }catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_UPDATE_ITEM")
    }   
}

const deleteItem = async (req, res) => {
    const  id  = req.comercio.idWeb
    if(req.params.soft === "soft"){
        try {
            const data = await webModel.delete({_id: id})
            res.send(data)
        } catch (err) {
            console.log(err)
            handleHttpError(res, "ERROR_SOFT_DELETE_ITEM")
        }
    }else{
        try {
            const data = await webModel.deleteOne({_id: id})
            res.send(data)
        } catch (err) {
            console.log(err)
            handleHttpError(res, "ERROR_TOTAL_DELETE_ITEM")
        }
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


const añadirReseña = async (req, res) => {
    const idUser = req.user._id
    const { id, texto, puntuacion } = matchedData(req)
    const reseña = { idUsuario: idUser, texto, puntuacion }
    // console.log("Reseña", reseña)

    try {

        // Buscar la web por id
        const web = await webModel.findById(id)

        // Verificar si el usuario ya ha escrito una reseña
        const yaHaEscritoReseña = web.reseñas.some(reseña => reseña.idUsuario.toString() === idUser.toString())
        if (yaHaEscritoReseña) {
            return res.status(400).send({ error: 'El usuario ya ha escrito una reseña' })
        }

        const data = await webModel.findByIdAndUpdate(id, { $push: { reseñas: reseña }, $inc: { numPuntuaciones: 1 } }, { new: true })
        // console.log("Data", data)
        const nuevoScoring = nuevaMedia(data.scoring, data.numPuntuaciones-1, puntuacion)
        // console.log("Nuevo Scoring", nuevoScoring)
        const data2 = await webModel.findByIdAndUpdate(id, { scoring: nuevoScoring }, { new: true })
        res.send(data2)
    } catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_AÑADIR_RESEÑA")
    }
}
function nuevaMedia(scoring, numPuntuaciones, nuevaPuntuacion){
    console.log(scoring, "*", numPuntuaciones, "+", nuevaPuntuacion)
    console.log("NumPuntuaciones + 1: ", numPuntuaciones + 1)
    return ((scoring * numPuntuaciones + nuevaPuntuacion) / (numPuntuaciones + 1))
}


const getMailsUsers = async (req, res) => {
    const id = req.comercio.idWeb
    try {
        const data = await webModel.findById(id)
        const ciudad = data.ciudad
        const actividad = data.actividad
        // console.log("Ciudad", ciudad)
        // console.log("Actividad", actividad)

        const data2 = await userModel.find({ 
            ciudad: new RegExp( ciudad, 'i'), 
            recibirOfertas: true,
            intereses: { $in: [new RegExp(actividad, 'i')] }
        })

        res.send(data2.map(user => user.email))
    }catch(err){
        console.log(err)
        handleHttpError(res, "ERROR_GET_MAILS_USERS")
    }
}

const postPhotoWeb = async (req, res) => {
    const id = req.comercio.idWeb
    const dataSorage = await postPhotoStorage(req.file)
    const idStorage = dataSorage._id

    try {
        const data = await webModel.findByIdAndUpdate(id, { $push: { fotos: idStorage } }, { new: true })
        const populatedData = await data.populate("fotos", "url -_id")
        res.send(populatedData)
    }catch(err){
        console.log(err)
        handleHttpError(res, "ERROR_POST_PHOTO")
    }
}
const fs = require("fs")
require('dotenv').config()

const PUBLIC_URL = process.env.PUBLIC_URL
const MEDIA_PATH = __dirname + "/../storage"

async function postPhotoStorage(file) {
    try {
        if (!file) {
            console.log("NO FILE")
            throw new Error("NO FILE")
        }
        const fileData = {
            filename: file.filename,
            url: process.env.PUBLIC_URL + "/" + file.filename
        }
        const data = await storageModel.create(fileData)
        return data
    } catch (err) {
        console.log(err)
        throw new Error("ERROR_CREATE_ITEM")
    }
}

const postTextos = async (req, res) => {
    const id = req.comercio.idWeb
    try {
        const {textos} = matchedData(req)
        console.log("Textos", textos)
        const data = await webModel.findByIdAndUpdate(id, { $push: { textos: textos } }, { new: true })
        res.send(data)
    }
    catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_CREATE_ITEM")
    }
}

module.exports = { 
    getItems, getItem, 
    createItem, 
    updateItem, 
    deleteItem, 
    softDeleteItem, buscarWebComercio, añadirReseña, updateWebComercio, getMailsUsers,
    postPhotoWeb, postTextos}


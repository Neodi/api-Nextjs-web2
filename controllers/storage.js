const { storageModel } = require('../models')
const { handleHttpError } = require('../utils/handleError')
const { matchedData } = require('express-validator')

const fs = require("fs")
require('dotenv').config()

const PUBLIC_URL = process.env.PUBLIC_URL
const MEDIA_PATH = __dirname + "/../storage"

const getItems = async (req, res) => {
    try {
        const data = await storageModel.find({})
        res.send(data)
    }catch(err) {
        handleHttpError(res, 'ERROR_LIST_ITEMS')
    }
}

const getItem = async (req, res) => {
    try{
        const {id} = matchedData(req)
        const data = await storageModel.findById(id)
        res.send(data)
    } catch(err){
        //console.log(err)
        handleHttpError(res, "ERROR_GET_ITEM")
    }
}

const createItem = async (req, res) => {
    try {
        const { body, file } = req
        if(!file) {
            console.log("NO FILE")
            return
        }
        const fileData = {
            filename: file.filename,
            url: process.env.PUBLIC_URL+"/"+file.filename
        }
        const data = await storageModel.create(fileData)
        res.send(data)
    }catch(err) {
        console.log(err)
        handleHttpError(res, "ERROR_CREATE_ITEM")
    }
}

const deleteItem = async (req, res) => {
    try{
        const {id} = matchedData(req)
        const dataFile = await storageModel.findById(id)
        await storageModel.deleteOne({_id:id})
        const filePath = MEDIA_PATH + "/" + dataFile.filename
        fs.unlinkSync(filePath)
        const data = {
            filePath,
            deleted: true
        }
        res.send(data)
    } catch(err){
        //console.log(err)
        handleHttpError(res, "ERROR_DELTE_FISICO_ITEM")
    }
}

const softDeleteItem = async (req, res) => {
    try{
        const {id} = matchedData(req)
        // const dataFile = await storageModel.findById(id)
        const data = await storageModel.delete({_id:id})
        /*
        const filePath = MEDIA_PATH + "/" + dataFile.filename
        fs.unlinkSync(filePath)
        const data = {
            filePath,
            deleted: true
        }
        */
        res.send(data)
    } catch(err){
        //console.log(err)
        handleHttpError(res, "ERROR_DELETE_LOGICO_ITEM")
    }
}

const deleteItemChulo = async (req, res) => {
    
    try{
        const {id, softDelete} = matchedData(req)

        if(softDelete === true){
            const data = await storageModel.delete({_id:id})
            res.send(data)
        }else{
            const dataFile = await storageModel.findById(id)
            await storageModel.deleteOne({_id:id})
            const filePath = MEDIA_PATH + "/" + dataFile.filename
            fs.unlinkSync(filePath)

            const data = {
                filePath,
                deleted: true
            }
            res.send(data)
        }      

    }catch(err){
        console.log(err)
        handleHttpError(res, "ERROR_DELETE_ITEM_CHULO")
    }
}

module.exports = { getItems, getItem, createItem, deleteItem, softDeleteItem, deleteItemChulo };
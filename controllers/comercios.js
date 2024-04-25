const { matchedData } = require("express-validator")
const { handleHttpError } = require("../utils/handleError")
const { comercioModel } = require("../models")

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
        const data = await comercioModel.create(body)
        res.send(data)
    } catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_CREATE_ITEM")
    }
}

const updateItem = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req)
        const data = await comercioModel.findByIdAndUpdate(id, body, { new: true })
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
    try {
        const { id } = matchedData(req)
        const data = await comercioModel.delete({_id: id})
        res.send(data)
    } catch (err) {
        console.log(err)
        handleHttpError(res, "ERROR_SOFT_DELETE_ITEM")
    }
}


module.exports = { getItems, getItem, createItem, updateItem, deleteItem, softDeleteItem}
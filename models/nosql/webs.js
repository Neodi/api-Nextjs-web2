const { text } = require("express")
const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const UserScheme = new mongoose.Schema(
    {
        // Datos base
        ciudad: {
            type: String
        },
        actividad: {
            type: String,
        },
        titulo:{
            type: String 
        },
        resumen:{
            type: Number            
        },
        textos:[{
            type: String
        }],
        fotos:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "storage"
        }],

        // Datos no modificables por el comercio
        scoring:{
            type: Number
        },
        numPuntuaciones:{
            type: Number
        },
        reseñas:[{
            
            texto:{
                type: String
            },
            puntuacion:{
                type: Number
            },
            idUsuario:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "users"
            }

        }],
        idComercio:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "comercios"
        }
    },
    {
        timestamp: true, 
        versionKey: false
    }
)
module.exports = mongoose.model("webs", UserScheme)
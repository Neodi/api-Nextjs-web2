const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const ReseñaScheme = new mongoose.Schema(
    {
        texto:{
            type: String,
        },
        puntuacion:{
            type: Number,
            required: true
        },
        idUsuario:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        }
    },
    {
        timestamp: true,
        versionKey: false
    }
)

const WebScheme = new mongoose.Schema(
    {
        // Datos base
        ciudad: {
            type: String,
            required: true
        },
        actividad: {
            type: String,
            required: true
        },
        titulo:{
            type: String,
            required: true 
        },
        resumen:{
            type: String,
            required: true          
        },
        textos:[{
            type: String
        }],
        fotos:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Storage"
        }],

        // Datos no modificables por el comercio
        scoring:{
            type: Number,
            default: 0
        },
        numPuntuaciones:{
            type: Number,
            default: 0
        },
        reseñas:[{
            type: ReseñaScheme
        }],
        idComercio:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "comercios",
            required: true
        }
    },
    {
        timestamp: true, 
        versionKey: false
    }
)
WebScheme.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("webs", WebScheme)
const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const UserScheme = new mongoose.Schema(
    {
        nombreComercio: {
            type: String,
            required: true
        },
        cif: {
            type: String,
            unique: true,
            required: true
        },
        direccion:{
            type: String,
            required: true
        },
        email:{
            type: Number,  
            unique: true,
            required: true          
        },
        telefono:{
            type: Number,
            unique: true,
            required: true
        },
        
        idWeb:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "webs"
        }
    },
    {
        timestamp: true, 
        versionKey: false
    }
)
module.exports = mongoose.model("comercios", UserScheme)
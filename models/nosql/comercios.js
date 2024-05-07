const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const ComercioScheme = new mongoose.Schema(
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
            type: String,  
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
            ref: "webs",
            default:  function() {
                return new mongoose.Types.ObjectId().toHexString();
            }
        }
    },
    {
        timestamp: true, 
        versionKey: false
    }
)
ComercioScheme.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("comercios", ComercioScheme)
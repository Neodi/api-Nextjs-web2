const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const UserScheme = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        edad:{
            type: Number,
            required: true,
            min: 1          
        },
        ciudad:{
            type: String,
            required: true
        },
        recibirOfertas:{
            type: Boolean,
            default: false,
        },
        role:{
            type: ["user", "admin"], 
            default: "user"
        }
    },
    {
        timestamp: true, 
        versionKey: false
    }
)
UserScheme.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("users", UserScheme)
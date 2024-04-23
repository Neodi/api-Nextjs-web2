const mongoose = require("mongoose")
const mongooseDelete = require("mongoose-delete")

const StorageScheme = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true
        },
        filename: {
            type: String,
        }
    },
    {
        timestamps: true, 
        versionKey: false
    }
)
StorageScheme.plugin(mongooseDelete, {overrideMethods: "all"})
module.exports = mongoose.model("Storage", StorageScheme, "storage") 
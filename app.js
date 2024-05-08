const express = require("express")
const cors = require("cors")
require('dotenv').config();

const app = express()

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("Servidor escuchando en el puerto " + port)
})

// --------------------------------------------

const dbConnect = require('./config/mongo')
dbConnect()

// --------------------------------------------

app.use("/api", require("./routes")) 

// --------------------------------------------

app.use(express.static("storage"))

// --------------------------------------------
const swaggerUi = require("swagger-ui-express")
const swaggerSpecs = require("./docs/swagger")

app.use("/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpecs)
)


module.exports = app
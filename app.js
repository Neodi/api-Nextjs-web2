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

// --------------------------------------------

const morganBody = require("morgan-body")
const loggerStream = require("./utils/handleLogger")

morganBody(app, {
    noColors: true, //limpiamos el String de datos lo máximo posible antes de mandarlo a Slack
    skip: function(req, res) { //Solo enviamos errores (4XX de cliente y 5XX de servidor)
        return res.statusCode < 400
    },
    stream: loggerStream
})





module.exports = app
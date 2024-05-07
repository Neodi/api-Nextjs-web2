const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
      openapi: "3.0.3",
      info: {
        title: "David Cuadrado - Backend con Node.js y Express en U-tad",
        version: "0.1.0",
        description:
          "Entrega Final de la asignatura de Backend con Node.js y Express en U-tad",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
      components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer"
            },
        },
        schemas:{
            comercios: {
                type: "object",
                required: ["nombreComercio", "cif", "direccion", "email", "telefono", "idWeb"],
                properties: {
                  nombreComercio: {
                    type: "string",
                    example: "Nombre del Comercio",
                  },
                  cif: {
                    type: "string",
                    example: 12345678,
                  },
                  direccion: {
                    type: "string",
                    example: "Dirección del Comercio",
                  },
                  email: {
                    type: "string",
                    example: "correo@comercio.com",
                  },
                  telefono: {
                    type: "integer",
                    example: 123456789,
                  },
                  idWeb: {
                    type: "string",
                    format: "uuid",
                    example: "5f86b82c20f04b11981449c3",
                  },
                },
              },
            users: {
                type: 'object',
                required: ['nombre', 'email', 'password', 'edad', 'ciudad'],
                properties: {
                    nombre: { type: 'string', example: 'John Doe' },
                    email: { type: 'string', example: 'john.doe@example.com' },
                    password: { type: 'string', example: 'password123' },
                    edad: { type: 'integer', format: 'int32', example: 25 },
                    ciudad: { type: 'string', example: 'Madrid' },
                    recibirOfertas: { type: 'boolean', default: true, example: true },
                    intereses: { type: 'array', items: { type: 'string' }, example: ['programming', 'sports'] },
                    role: { type: 'string', enum: ['user', 'admin'], default: 'user', example: 'user' },
                },
            },
            reseña: {
                type: 'object',
                required: ['texto', 'puntuacion'],
                properties: {
                  texto: { type: 'string', example: 'Esta es una reseña' },
                  puntuacion: { type: 'integer', format: 'int32', example: 5 },
                  idUsuario: { type: 'string', example: '60d2f3d4c3295be1b8a7e641' },
                },
              },
            webs: {
                type: 'object',
                required: ['ciudad', 'actividad', 'titulo', 'resumen', 'idComercio'],
                properties: {
                  ciudad: { type: 'string', example: 'Madrid' },
                  actividad: { type: 'string', example: 'Restaurante' },
                  titulo: { type: 'string', example: 'Restaurante El Buen Sabor' },
                  resumen: { type: 'string', example: 'El mejor restaurante de la ciudad' },
                  textos: { type: 'array', items: { type: 'string' }, example: ['Texto 1', 'Texto 2'] },
                  fotos: { type: 'array', items: { type: 'string' }, example: ['60d2f3d4c3295be1b8a7e641'] },
                  scoring: { type: 'integer', format: 'int32', example: 0 },
                  numPuntuaciones: { type: 'integer', format: 'int32', example: 0 },
                  reseñas: { type: 'array', items: { '$ref': '#/components/schemas/Reseña' }, example: [] },
                  idComercio: { type: 'string', example: '60d2f3d4c3295be1b8a7e641' },
                },
            },
            Storage: {
                type: 'object',
                required: ['url'],
                properties: {
                  url: { type: 'string', example: 'https://example.com/image.jpg' },
                  filename: { type: 'string', example: 'image.jpg' },
                },
              },
        },
      },
    },
    apis: ["./routes/*.js"],
  };
  
module.exports = swaggerJsdoc(options)
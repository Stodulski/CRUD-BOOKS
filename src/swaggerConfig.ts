import swaggerJsdoc from 'swagger-jsdoc'

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Prueba tecnica',
      version: '1.0.0',
      description: 'Prueba tecnica'
    },
    servers: [
      {
        url: 'http://localhost:3000/api'
      }
    ]
  },
  apis: ['./src/routes/*.ts'] // Ruta a los archivos de rutas con anotaciones Swagger
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)

export default swaggerDocs

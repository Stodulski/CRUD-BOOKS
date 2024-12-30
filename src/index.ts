import express from 'express'
import helmet from 'helmet'
import dotenv from 'dotenv'
import connectDB from './db'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swaggerConfig'

import authorRoutes from './routes/authorRoutes'
import editorialRoutes from './routes/editorialRoutes'
import bookRoutes from './routes/bookRoutes'

dotenv.config()

const app = express()

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())

app.use('/api/authors', authorRoutes)
app.use('/api/editorials', editorialRoutes)
app.use('/api/books', bookRoutes)

const port =
  !isNaN(Number(process.env.PORT)) && Number(process.env.PORT) !== 0
    ? process.env.PORT
    : 3000

app.listen(port, () => {
  console.log(`Server start at port ${port}`)
})

export default app

import 'reflect-metadata'
import express from 'express'
import * as bodyParser from 'body-parser'
import cors from 'cors'

import joiErrorHandler from './src/middlewares/joiErrorHandler'
import * as errorHandler from './src/middlewares/apiErrorHandler'

import routes from './src/routes'

const app = express()

app.use(bodyParser.json())

app.use(cors())
app.use('/v1', routes)

app.use(joiErrorHandler)
app.use(errorHandler.notFoundErrorHandler)
app.use(errorHandler.errorHandler)

export default app

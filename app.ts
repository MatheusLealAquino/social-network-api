import 'reflect-metadata'
import express from 'express'
import * as bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'

import joiErrorHandler from './src/middlewares/joiErrorHandler'
import * as errorHandler from './src/middlewares/apiErrorHandler'

import routes from './src/routes'

const app = express()

morgan.token('body', req => {
  const parsedBody = req?.body || {}
  if (parsedBody.password) delete parsedBody.password
  return JSON.stringify(parsedBody)
})

app.use(bodyParser.json())
app.use(cors())
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] | body: :body'))

app.use('/v1', routes)

app.use(joiErrorHandler)
app.use(errorHandler.notFoundErrorHandler)
app.use(errorHandler.errorHandler)

export default app

import app from './app'

import { AppDataSource } from './src/data-source'

const port = 3000

AppDataSource.initialize().then(async () => {
  console.warn('connection to database')
  app.listen(port, () => {
    console.warn(`App listening on port ${port}`)
  })
}).catch(error => console.error(error))

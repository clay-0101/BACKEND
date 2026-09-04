import epxress from  'express'
import router from '../routes/app.router.js'

const app = epxress()

app.use(epxress.json())

app.use('/', router)

export default app
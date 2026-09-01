import express from 'express'
import router from './routes/app.router.js'


let app = express()
app.use(express.json())

app.use('/file', router)

export default app
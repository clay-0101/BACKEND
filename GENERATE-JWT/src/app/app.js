import express from 'express'
import jwt from 'jsonwebtoken'

const app = express()
app.use(express.json())

app.post('/auth/register', (req, res) => {

    let { name, email, password } = req.body

    const token = jwt.sign(
        {
            name,
            email
        },
        process.env.JWT_SECRET
    )
    res.status(201).json({
        message : "user registered successfully...",
        user :{
            name,
            email
        },
        token
    })
})

export default app

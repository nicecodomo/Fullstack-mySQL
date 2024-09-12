const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')

const app = express()
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))
app.use(cookieParser())

const port = 5000
const secret = 'mysecret'

let conn = null

const initMySQL = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'tutorial'
    })
}

app.post('/api/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10)
        const userData = {
            email,
            password: passwordHash
        }
        const [results] = await conn.query('INSERT INTO users SET ? ', userData)
        res.json({
            message: 'insert ok',
            results
        })
    } catch (error) {
        console.log('error', error)
        res.json({
            message: 'insert error',
            error
        })
    }
})

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const [results] = await conn.query('SELECT * FROM users WHERE email = ?', email)
        const userData = results[0]
        if (results.length > 0) {
            const match = await bcrypt.compare(password, userData.password)
            if (!match) {
                res.json({
                    message: 'login fail (wrong email, pass)'
                })
                return false
            }

            // สร้าง jwt token
            const token = jwt.sign({ email, role: 'admin' }, secret, { expiresIn: '1h' })
            res.cookie('token', token, {
                maxAge: 300000,
                secure: true,
                httpOnly: true,
                sameSite: 'none',
            })

            res.json({
                message: 'login ok'
            })

        } else {
            res.json({
                message: 'email not found'
            })
        }
    } catch (error) {
        console.log('error', error)
        res.status(401).json({
            message: 'login fail',
            error
        })
    }
})

app.get('/api/users', async (req, res) => {
    try {
        // const authHeader = req.headers.authorization
        const authToken = req.cookies.token
        // let authToken = ''
        // if (authHeader) {
        //     authToken = authHeader.split(' ')[1]
        // }
        console.log('authToken', authToken)
        const user = jwt.verify(authToken, secret)
        // jwt handle error ไว้เรียบร้อยแล้ว
        // recheck จาก database
        const [checkResults] = await conn.query('SELECT * FROM users WHERE email = ?', user.email)

        if (!checkResults[0]) {
            throw { message: 'user not found' }
        }

        const [results] = await conn.query('SELECT * FROM users')
        res.json({
            status: 'ok',
            users: results
        })
    } catch (error) {
        res.status(403).json({
            status: 'error',
            msg: 'authentication fail',
            error
        })
    }
})

app.listen(port, async () => {
    await initMySQL();
    console.log(`Example app listening at http://localhost:${port}`);
})
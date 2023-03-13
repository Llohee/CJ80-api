import express from 'express'
import { mapOder } from '*/ultilities/sorts.js'

const app = express()

const hostname = 'localhost'
const port = 3000

app.get('/', (req, res) => {
    res.end('<h1>Hello Giang</h1><hr/>')
})

app.listen(port, hostname, () => {
    console.log(`Hello trello web ${hostname}: ${port} /`)
})
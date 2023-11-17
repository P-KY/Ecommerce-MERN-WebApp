import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'

// configur env

dotenv.config();

// create rest object

const app = express()

// rest api's

app.get('/',(req,res) => {
    res.send('<h1>Welcome to ecommerce app</h1>')
})

// Port

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.DEV_MODE} mode on port ${PORT}....`.bgCyan.white);
})
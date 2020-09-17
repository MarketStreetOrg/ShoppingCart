const express = require('express')
const { router } = require('./router')

require('dotenv').config();

let config = process.env;
let app = express();

app.set('x-powered-by', false)
app.use(router)

app.listen(config.port,config.host).on('listening', () => {
    console.log(`Server is listening on hostname: ${config.host} and port: ${config.port}`)
});
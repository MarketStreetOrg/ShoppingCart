const express = require('express')
const { router } = require('./router')
const env =require('dotenv')

let {parsed:config} = env.config();
let app = express();

app.set('x-powered-by', false)
app.use(router)

app.listen(config.port,config.host).on('listening', () => {
    console.log("Server is listening")
});
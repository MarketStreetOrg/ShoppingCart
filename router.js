const express = require('express')
const cors=require('cors')

const jsonParser = express.json;
const router = express.Router();

corsOptions={
    origin:"http:localhost:8081/",
    methods:"GET,PUT,POST"
}

router.all('/',cors(corsOptions),(req, res, next) => {
    return next();
})

router.get('/',(req,res,next)=>{
    console.log("And we are here");
    next();
})



module.exports={router}
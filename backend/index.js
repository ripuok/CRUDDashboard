const express = require('express');
const bodyParser =require('body-parser');
const user = require('./user');
const cors = require('cors');


const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

app.use(cors());
app.use('/user', user )



const port = 4000;

app.listen(port,()=>{
    console.log("Server Running on port "+port)
});
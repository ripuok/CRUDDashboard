const express = require('express');
const bodyParser =require('body-parser');
const user = require('./user');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

app.use(cors());

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));
app.use('/user', user )

const port = 4000;

app.listen(port,()=>{
    console.log("Server Running on port "+port)
});
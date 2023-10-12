require('dotenv').config();
const express=require('express');
const cors=require('cors');
const router = require('./Routes/Router.js');
require('./db/conn.js');
const app= express();

const PORT=process.env.PORT||8080

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT,()=>{
    console.log('server is running on port ',PORT)
})
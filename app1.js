const { log } = require('console');
const express = require('express');
const app = express();
const port = 4000;
const path = require('path');

app.get("/",(req,res)=> {
    res.send('Phabuwat');
});

app.listen(port,()=>{
    console,log('sebver', port);
});
const express = require('express');
const app = express();
const { readFromFile, readAndAppend } = require('../utils/file-handling');

app.get('/', (req, res) => { 
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

app.get('/api/notes', (req,res)=>{
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));

});

app.post('/api/notes', (req,res)=>{

})


module.exports = app;
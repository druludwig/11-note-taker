const express = require('express');
const fs = require('fs')
const app = express();
const path = require('path')
const data = require("./db/db.json")

let PORT = 3001

app.use(express.json());

app.get('/notes', (req,res)=>{
    res.sendFile(path.join(__dirname, '/public/notes.html'));})

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/api/notes', (req,res)=>{
      res.json(data)
})

app.post('/api/notes', (req,res)=>{

})

app.use(express.static('public'));


app.listen(PORT, () =>
  console.info(`NoteTaker listening at http://localhost:${PORT} 🚀`)
)
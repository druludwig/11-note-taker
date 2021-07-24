const express = require('express');
const app = express();
const path = require('path')
const data = require("./db/db.json")

let PORT = 3001

app.use(express.json());

app.get('/notes', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public/notes.html'));

})

app.get('/api/notes', (req,res)=>{
    res.json(data)
})

app.post('/api/notes', (req,res)=>{
    data.push(req.body);
    res.json(data) 
})

app.use(express.static('public'));


app.listen(PORT, () =>
  console.info(`Example app listening at http://localhost:${PORT} 🚀`)
)
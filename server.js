const express = require('express');
const app = express();
const data = require("./db/db.json")

let PORT = 3001


app.get('/api/notes', (req,res)=>{
    res.json(data)
})

app.use(express.static('public'));


app.listen(PORT, () =>
  console.info(`Example app listening at http://localhost:${PORT} 🚀`)
)
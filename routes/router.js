const express = require('express');
const app = express();
const { readFromFile, readAndAppend } = require('../utils/file-handling');
const { v4: uuidv4 } = require('uuid');

app.get('/', (req, res) => { 
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

app.get('/api/notes', (req,res)=>{
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

app.post('/', (req,res)=>{
    const { title, text, feedback } = req.body;

    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      res.json(response);
    } else {
      res.json('Error in saving note');
    }
})


module.exports = app;
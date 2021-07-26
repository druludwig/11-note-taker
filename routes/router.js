const express = require('express');
const app = express();
const { readFromFile,readAndAppend,writeToFile } = require('../utils/file-handling');
const { v4: uuidv4 } = require('uuid');

app.get('/', (req, res) => { 
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

app.get('/api/notes', (req,res)=>{
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

app.post('/', (req,res)=>{
    const { title, text, feedback } = req.body;
    if (title && text) {
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

app.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.id !== noteId);
        writeToFile('./db/db.json', result);
        res.json(`Item ${noteId} has been deleted 🗑️`);
      })
});

module.exports = app;
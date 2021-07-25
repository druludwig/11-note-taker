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

app.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all tips except the one with the ID provided in the URL
        const result = json.filter((note) => note.id !== noteId);
  
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${noteId} has been deleted 🗑️`);
      })
});

module.exports = app;
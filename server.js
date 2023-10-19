const express = require('express');
const path = require('path');
const notes = require('./db/db.json');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//get /notes returns notes.html
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
)
// get /api/notes reads db.json and returns all saved notes as json
app.get('/api/notes', (req, res) => {
    res.json(notes);
  });
// post /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved. Look for npm packages that do this

//get * returns index.html
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
)

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
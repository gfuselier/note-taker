const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
let notes = require('./db/db.json');

const PORT = process.env.PORT || 3001;
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

// post /api/notes receives a new note to save on the request body, add it to the db.json file with a unique id, and then return the new notes file
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);
    console.log(req.body) //req.body is the stringified note
    const {title, text} = req.body
    //creates a new note object and adds the id
    const newNote = {
      title,
      text,
      id: uuidv4(),
    }
    console.log(newNote)
    notes.push(newNote)
    //adds updated notes array to db file and returns file to the front end
    fs.writeFile('./db/db.json', JSON.stringify(notes),
    (err) => {
      if(err) {console.log(err)}
      else {return res.json(notes)}
    })
})

//delete at /api/notes/:id will filter the notes array and return it with all the notes that don't have the id of the one user clicked to delete
app.delete('/api/notes/:id', (req, res) => {
  console.log(req.params.id)
  notes = notes.filter((note) => note.id !== req.params.id)
  console.log(notes)
  //adds updated notes array to db file and returns file to the front end
  fs.writeFile('./db/db.json', JSON.stringify(notes),
    (err) => {
      if(err) {console.log(err)}
      else {return res.json(notes)}
    })
})

//get * returns index.html
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
)

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
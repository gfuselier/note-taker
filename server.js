const express = require('express');
const path = require('path');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//get /notes should return notes.html
// get /api/notes should read db.json and return all saved notes as json
// post /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved. Look for npm packages that do this
//get * should return index.html

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
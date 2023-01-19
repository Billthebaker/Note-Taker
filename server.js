const express = require('express');
const path = require('path');
const fs = require('fs');
const { clog } = require('./middleware/clog')
let db = require('./db/db.json');
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(express.static('./public'));

//Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
//Readfile Function to parse data
app.get('/api/notes', (req, res) =>{
 fs.readFile('./db/db.json', 'utf8', (err, data) => {
  console.log(data);
  if (err) res.json(err);
  res.json(JSON.parse(data));
 })
});
// Post function to post notes on the side
app.post('/api/notes', (req, res) =>{
  console.log(req.body)
  db.push(req.body)
  fs.writeFile('./db/db.json', JSON.stringify(db), function(error){
    if (error) throw error
    res.status(200).json(db);
  })
});


// PORT LISTENER
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
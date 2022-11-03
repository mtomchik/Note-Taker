const nt = require('express').Router();
const fs = require('fs');
const uuid = require('../helpers/uuid');


nt.get('/notes', (req, res) =>{
  readFromFile('../db/db.json').then((data) => res.json(JSON.parse(data)))
});

nt.post('/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
  
    const { title, text  } = req.body;
  
    if (title && text) {
      const newnote = {
        title,
        note,
        note_id: uuid(),
      };
  
      // Obtain existing notes
      fs.readFile('../db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const parsednotes = JSON.parse(data);
  
          parsednotes.push(newnote);
          fs.writeFile(
            '../db/db.json',
            JSON.stringify(parsednotes, null, 4),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated notes!')
          );
        }
      });
  
      const response = {
        status: 'success',
        body: newnote,
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting note');
    }
  });

  module.exports = nt;
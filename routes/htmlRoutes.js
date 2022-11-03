const html = require('express').Router();

const app = express();

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/notes.html'))
);

module.exports = html
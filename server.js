/* eslint no-console: 0 */
var express = require('express');
var path = require('path');
var app = express();

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(3000, 'localhost', (error) => {
  if (error) {
    return console.error(error);
  }
  console.log(`App listening on port 3000`);
});

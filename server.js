const express = require('express');
const icy = require('icy');

const app = express();
const port = process.env.PORT || 4800;
const url = 'http://radiosavta.cdnwz.net:9005/savta_live';

app.listen(port, () => {
  console.log('Server on port', port);
});
// URL to a known Icecast stream
var songName = {
  StreamTitle: 'Sorry There\'s Something Wrong...'
};

icy.get(url, function(res) {

  // log any "metadata" events that happen
  res.on('metadata', (metadata) => {
    var parsed = icy.parse(metadata);
    songName = parsed;
  });
  res.resume();
});

app.get('/', (req, res) => {
  console.log('get /');
  res.set('Access-Control-Allow-Origin', '*');
  res.send(songName);
});
app.get('/stats', (req, res) => {
  console.log('get /stats');
  res.set('Access-Control-Allow-Origin', '*');
  res.send(songName);
});

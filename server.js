const express = require('express');
const icy = require('icy');

const app = express();
const port = process.env.PORT || 4800

app.set('port', port)

app.listen(4800, () => {
  console.log('Server on port', port);
});
// URL to a known Icecast stream
var songName;
var url = 'http://cp12.cdnwz.net/savta';


icy.get(url, function (res) {

  // log any "metadata" events that happen
  res.on('metadata', function (metadata) {
    var parsed = icy.parse(metadata);
    console.error(parsed);
    songName = parsed;
  });
  res.resume();
});

app.get('/', (req, res) => {
  console.log('get /')

  res.set('Access-Control-Allow-Origin', '*');
  res.send(songName.StreamTitle);

});

// http://cp12.cdnwz.net/savta

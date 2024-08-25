const express = require('express');
const path = require('path');
const SpotifyWebApi = require('spotify-web-api-node');
const app = express();
const port = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  // credentials are optional
  var spotifyApi = new SpotifyWebApi({
    clientId: '',
    clientSecret: '',
    redirectUri: 'http://www.iamcoreyg.com/callback'
  });

  console.log('spotifyApi', spotifyApi);

  spotifyApi.getUser('iamcoreyg')
  .then(function(data) {
    console.log('Some information about this user', data.body);
  }, function(err) {
    console.log('Something went wrong!', err);
  });

  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/entry/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

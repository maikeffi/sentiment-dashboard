var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server, { log: false }),
    redis = require('redis'),
    Twit = require('twit');

var client = redis.createClient(),
    client2 = redis.createClient();

server.listen(process.env.PORT || 8000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/data.json', function (req, res) {
    client.get('sentiments', function(err, data) {
        res.end(data);
    });
});

io.sockets.on('connection', function (socket) {
    client2.on('message', function(channel, message) {
        socket.emit('sentiment', 'score');
    }).subscribe('sentiment');
});

var T = new Twit({
      consumer_key:         'CrtktWvOl0xR1lDV4rMVAA'
    , consumer_secret:      'guNeZTl3He5yD3kJ4lIH5T52Xnbti1A4Umauj4V08jM'
    , access_token:         '202459962-JWLKxFw9R09h1samBCAwqjFCulzNyN70vJnWwc3B'
    , access_token_secret:  'nBSRcQlTHVzUFnRqyj0K5Cc3ajRgugeZw5HFSdyY'
});

// client.del('countries');
// client.del('tweets');

//
//  filter the twitter public stream by the word 'mango'. 
var stream = T.stream('statuses/filter', { track:'coke,mcdonalds,burger,fries' }) //, locations: [-180, -75, 180, 75] });

stream.on('tweet', function (tweet) {
  console.log(tweet.place['country_code'] + ' ' + tweet.text);
  client.lpush('countries', tweet.place['country_code']);
  client.lpush('tweets', tweet.text);
  client.set('update', 'yes');
});


